(() => {
  'use strict';

  const APP_VERSION = '3.5.2';
  const SCHEMA_VERSION = '1.0.0';
  const STORAGE_KEY = 'harnessCardV3WorkingRecords';
  const SAVE_TIME_KEY = 'harnessCardV3LastSaved';
  const MAX_IMPORT_BYTES = 2_000_000;
  const MAX_IMPORT_RECORDS = 2000;
  const ORIGINS = ['seeded-exploratory','local-manual','imported','real-world-test'];
  const REVIEW_STATES = ['unreviewed','reviewed','sanitized','public-safe','rejected'];

  let seedRecords = [];
  let workingRecords = [];
  let currentMode = 'full';
  let lastAnalysis = null;
  let pendingImport = null;

  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  const now = () => new Date().toISOString();
  const text = value => String(value ?? '').trim();

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function flash(message, kind = 'info') {
    const old = document.querySelector('[data-flash]');
    if (old) old.remove();
    const node = document.createElement('div');
    node.dataset.flash = 'true';
    node.className = `pill ${kind}`;
    node.setAttribute('role', 'status');
    node.textContent = message;
    node.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:1000;padding:11px 14px;background:#091327;box-shadow:0 18px 48px rgba(0,0,0,.35)';
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function normalizeSeed(record) {
    return {
      ...record,
      origin: 'seeded-exploratory',
      reviewState: 'reviewed',
      repairType: normalizeWeight(record.cardWeightRecommendation),
      updatedAt: record.updatedAt || record.createdAt || now()
    };
  }

  function normalizeWeight(value) {
    const lower = String(value || '').toLowerCase();
    if (lower.includes('direct') && !lower.includes('mini')) return 'Direct';
    if (lower.includes('mini')) return 'Mini';
    return 'Full';
  }

  function normalizeRecord(record, origin = 'imported') {
    if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('Every record must be an object.');
    const id = text(record.id) || `${origin}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const normalizedOrigin = ORIGINS.includes(record.origin) ? record.origin : origin;
    const reviewState = REVIEW_STATES.includes(record.reviewState) ? record.reviewState : 'unreviewed';
    return {
      ...record,
      id,
      createdAt: record.createdAt || now(),
      updatedAt: now(),
      origin: normalizedOrigin,
      reviewState,
      scenarioName: text(record.scenarioName) || 'Untitled scenario',
      failureType: text(record.failureType) || 'Unknown',
      repairType: record.repairType || normalizeWeight(record.cardWeightRecommendation),
      cardWeightRecommendation: record.cardWeightRecommendation || record.repairType || 'Full',
      outcomePreference: text(record.outcomePreference) || 'Unresolved',
      dashboardNotes: text(record.dashboardNotes),
      originalPrompt: text(record.originalPrompt)
    };
  }

  async function loadSeedRecords() {
    const response = await fetch('data/seed-data.json', {cache:'no-store'});
    if (!response.ok) throw new Error(`Seed data failed to load (${response.status}).`);
    const payload = await response.json();
    const records = Array.isArray(payload) ? payload : payload.records;
    if (!Array.isArray(records)) throw new Error('Seed data does not contain a records array.');
    seedRecords = records.map(normalizeSeed);
  }

  function loadWorkingRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(r => normalizeRecord(r, r.origin === 'real-world-test' ? 'real-world-test' : 'local-manual'));
    } catch (error) {
      console.warn('Working records could not be loaded:', error);
      return [];
    }
  }

  function saveWorkingRecords(showMessage = true) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workingRecords));
    const stamp = now();
    localStorage.setItem(SAVE_TIME_KEY, stamp);
    updateStorageStatus();
    if (showMessage) flash('Working records saved locally.', 'good');
  }

  function allRecords() { return [...seedRecords, ...workingRecords]; }

  function scopedRecords() {
    const scope = $('metricScope').value;
    if (scope === 'seed') return seedRecords;
    if (scope === 'working') return workingRecords;
    return allRecords();
  }

  function renderMetrics() {
    const records = scopedRecords();
    const outcomes = countBy(records, 'outcomePreference');
    $('metrics').innerHTML = [
      metricCard(records.length, 'records in scope'),
      metricCard(outcomes.Harness || 0, 'Harness preferred'),
      metricCard(outcomes.Mixed || 0, 'Mixed / close'),
      metricCard(outcomes.Baseline || 0, 'Baseline preferred')
    ].join('');
    $('originBreakdown').innerHTML = breakdownTable(countBy(records, 'origin'));
    $('weightBreakdown').innerHTML = breakdownTable(countBy(records, 'repairType'));
  }

  function metricCard(value, label) {
    return `<div class="card flat"><div class="metric">${escapeHtml(value)}</div><div class="label">${escapeHtml(label)}</div></div>`;
  }

  function countBy(records, key) {
    return records.reduce((acc, record) => {
      const value = record[key] || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  function breakdownTable(counts) {
    const rows = Object.entries(counts).sort((a,b) => a[0].localeCompare(b[0])).map(([name,count]) => `<tr><td>${escapeHtml(name)}</td><td>${count}</td></tr>`).join('');
    return rows ? `<table><thead><tr><th>Name</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table>` : '<p class="subtle">No records in this scope.</p>';
  }

  function setupFilters() {
    const records = allRecords();
    fillFilter('filterOrigin', [...new Set(records.map(r => r.origin))]);
    fillFilter('filterReview', [...new Set(records.map(r => r.reviewState))]);
    fillFilter('filterOutcome', [...new Set(records.map(r => r.outcomePreference))]);
  }

  function fillFilter(id, values) {
    const select = $(id);
    const current = select.value;
    const first = select.options[0].outerHTML;
    select.innerHTML = first + values.filter(Boolean).sort().map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('');
    if (values.includes(current)) select.value = current;
  }

  function filteredRecords() {
    const origin = $('filterOrigin').value;
    const review = $('filterReview').value;
    const outcome = $('filterOutcome').value;
    const query = $('filterSearch').value.toLowerCase().trim();
    return allRecords().filter(record =>
      (!origin || record.origin === origin) &&
      (!review || record.reviewState === review) &&
      (!outcome || record.outcomePreference === outcome) &&
      (!query || JSON.stringify(record).toLowerCase().includes(query))
    );
  }

  function renderRows() {
    const body = $('recordRows');
    body.innerHTML = '';
    const records = filteredRecords();
    if (!records.length) {
      body.innerHTML = '<tr><td colspan="8" class="empty">No matching records.</td></tr>';
      return;
    }
    for (const record of records) {
      const editable = record.origin !== 'seeded-exploratory';
      const row = document.createElement('tr');
      row.dataset.clickable = 'true';
      row.innerHTML = `<td>${escapeHtml(record.id)}</td><td>${escapeHtml(record.origin)}</td><td>${escapeHtml(record.reviewState)}</td><td>${escapeHtml(record.scenarioName)}</td><td>${escapeHtml(record.failureType)}</td><td><span class="pill ${outcomeClass(record.outcomePreference)}">${escapeHtml(record.outcomePreference)}</span></td><td>${escapeHtml(record.repairType)}</td><td class="actions">${editable ? `<button data-action="edit" data-id="${escapeHtml(record.id)}">Edit</button><button data-action="duplicate" data-id="${escapeHtml(record.id)}">Duplicate</button><button data-action="review" data-id="${escapeHtml(record.id)}">Advance review</button><button class="danger" data-action="delete" data-id="${escapeHtml(record.id)}">Delete</button>` : '<span class="subtle">Reference record</span>'}</td>`;
      const detailRow = document.createElement('tr');
      detailRow.className = 'detail-row';
      detailRow.innerHTML = `<td colspan="8"><div class="detail"><strong>Original signal / prompt</strong><pre>${escapeHtml(record.originalPrompt || '')}</pre><strong>Outcome and notes</strong><pre>${escapeHtml(record.dashboardNotes || record.harnessResponseSummary || '')}</pre><strong>Provenance</strong><p class="subtle">Created ${escapeHtml(record.createdAt)} · Updated ${escapeHtml(record.updatedAt || record.createdAt)} · Origin ${escapeHtml(record.origin)} · Review ${escapeHtml(record.reviewState)}</p></div></td>`;
      row.addEventListener('click', event => {
        if (event.target.closest('button')) return;
        detailRow.querySelector('.detail').classList.toggle('open');
      });
      body.append(row, detailRow);
    }
  }

  function outcomeClass(outcome) {
    if (outcome === 'Harness') return 'good';
    if (outcome === 'Mixed' || outcome === 'Unresolved') return 'warn';
    if (outcome === 'Baseline') return 'bad';
    return 'info';
  }

  function renderAll() {
    setupFilters();
    renderMetrics();
    renderRows();
    updateStorageStatus();
  }

  function analyze() {
    const cleaned = text($('rawInput').value);
    if (!cleaned) {
      flash('Paste a failure window first.', 'warn');
      return;
    }
    const result = window.HarnessParserHeuristic.recommend(cleaned);
    const card = buildRepairCard(cleaned, result);
    lastAnalysis = {...result, cleaned, card};
    $('tokenEstimate').textContent = result.tokenEstimate;
    $('recommendedMode').textContent = titleCase(result.mode);
    $('confidence').textContent = titleCase(result.confidence);
    $('heuristicDisclaimer').textContent = result.disclaimer;
    $('reasonList').innerHTML = result.reasons.map(reason => `<li>${escapeHtml(reason)}</li>`).join('');
    const detected = Object.entries(result.signals).filter(([,active]) => active).map(([name]) => name);
    $('signalList').innerHTML = detected.length ? detected.map(name => `<span class="pill info">${escapeHtml(splitCamel(name))}</span>`).join('') : '<span class="pill">no decisive signal</span>';
    $('repairOutput').textContent = card;
  }

  function titleCase(value) { return String(value).charAt(0).toUpperCase() + String(value).slice(1); }
  function splitCamel(value) { return String(value).replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(); }

  function buildRepairCard(input, result) {
    const excerpt = input.slice(0, 2200);
    if (result.mode === 'direct') return 'Correct the visible mistake now. Follow the original request exactly and provide only the requested output with no extra text.';
    if (result.mode === 'mini') return `MINI HARNESS — OUTPUT DISCIPLINE\n\nStop.\n\nYou violated the requested output boundary.\n\nOriginal request / active constraint:\n${excerpt}\n\nAnswer again using only the requested format.\n\nNo explanation.\nNo intro.\nNo outro.\nNo diagnostic labels.\nNo extra text.`;
    return `STOP.\n\nBefore continuing, output these labels exactly:\n\nPOINT A: Recover the actual origin and current state from the pasted context.\nPOINT B: Continue toward the user's intended destination without restarting.\nDRIFT: Identify where interpretation moved away from the human's real task.\nLOST CONSTRAINTS: Restore all stated boundaries, materials, decisions, and output requirements.\nUNDERLYING SIGNAL: Preserve the meaning the user is actually trying to carry forward.\nTRUST ISSUE: Separate verified facts, inference, recommendation, and unresolved questions.\nHANDOFF RISK: Prevent the next response or model from inheriting the wrong project state.\nNEXT STRAIGHT STEP: Take the smallest defensible continuation.\n\nRelevant context:\n${excerpt}\n\nThen continue with the corrected answer. Do not restart, widen scope, overexplain, or invent certainty.`;
  }

  function fillGeneratorFromAnalysis() {
    if (!lastAnalysis) analyze();
    if (!lastAnalysis) return;
    setMode(lastAnalysis.mode);
    $('pointA').value = lastAnalysis.cleaned.slice(0, 1000);
    $('pointB').value = 'Recover the conversation and produce the next useful answer without restarting.';
    $('drift').value = lastAnalysis.failure === 'Output-format violation' ? 'The requested output boundary was violated.' : 'The response drifted from the active human model or lost continuity.';
    $('constraints').value = 'Preserve the active constraints, current state, requested format, and evidence boundary.';
    $('signal').value = 'Continue the real task rather than replacing it with a cleaner invented problem.';
    $('trust').value = 'Do not convert assumptions, repetition, or confidence into verified truth.';
    $('handoff').value = 'The next response may inherit the wrong task, authority, evidence state, or project state.';
    $('nextStep').value = 'Produce the smallest useful continuation that respects the original request.';
    generateCard();
    document.querySelector('#generator').scrollIntoView({behavior:'smooth'});
  }

  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-tab').forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function generateCard() {
    const pointA = text($('pointA').value) || '[Actual origin and current state]';
    const pointB = text($('pointB').value) || '[Intended destination]';
    const drift = text($('drift').value) || '[Where interpretation moved away from reality]';
    const constraints = text($('constraints').value) || '[Lost constraints or active output boundary]';
    const signal = text($('signal').value) || '[Meaning that must survive]';
    const trust = text($('trust').value) || '[Unsupported, uncertain, or contaminated material]';
    const handoff = text($('handoff').value) || '[What may be inherited incorrectly]';
    const nextStep = text($('nextStep').value) || '[Smallest defensible continuation]';
    let output;
    if (currentMode === 'direct') {
      $('modeHint').textContent = 'Direct Correction is for a tiny, obvious, visible mistake.';
      output = `Correct this now:\n${drift}\n\nDo only this:\n${nextStep}`;
    } else if (currentMode === 'mini') {
      $('modeHint').textContent = 'Mini Harness restores an output boundary without rebuilding the whole context.';
      output = `MINI HARNESS — OUTPUT DISCIPLINE\n\nStop.\n\nOriginal request:\n${pointA}\n\nViolation:\n${drift}\n\nRequired format / constraints:\n${constraints}\n\nAnswer again using only the requested format.\n\nNo explanation.\nNo intro.\nNo outro.\nNo diagnostic labels.\nNo extra text.`;
    } else {
      $('modeHint').textContent = 'Full Harness reconstructs shared reality when context, trust, continuity, or constraints have broken.';
      output = `STOP.\n\nBefore continuing, output these labels exactly:\n\nPOINT A: ${pointA}\nPOINT B: ${pointB}\nDRIFT: ${drift}\nLOST CONSTRAINTS: ${constraints}\nUNDERLYING SIGNAL: ${signal}\nTRUST ISSUE: ${trust}\nHANDOFF RISK: ${handoff}\nNEXT STRAIGHT STEP: ${nextStep}\n\nThen continue with the corrected answer.\n\nRules:\n- Do not restart.\n- Do not overexplain.\n- Do not ignore the constraints.\n- Do not invent certainty.\n- Move from Point A toward Point B.`;
    }
    $('generatedCard').textContent = output;
  }

  async function copyText(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    flash(successMessage, 'good');
  }

  function loadExample() {
    setMode('full');
    $('pointA').value = 'Build a rustic fence using five-foot T-posts, cattle panels, rough logs, rocky uneven ground, limited money, and real livestock pressure.';
    $('pointB').value = 'A practical field-build plan using the materials already available.';
    $('drift').value = 'The answer replaced the real pile of materials with an ideal commercial fence design.';
    $('constraints').value = 'Keep the five-foot T-posts, cattle panels, rough logs, uneven rocky terrain, limited budget, and livestock pressure.';
    $('signal').value = 'The user needs make-do field engineering from reality, not an ideal fence specification.';
    $('trust').value = 'Recommendations to buy a different system are unsupported by the actual budget and request.';
    $('handoff').value = 'Future answers may continue solving “a proper fence” instead of Randy’s actual fence.';
    $('nextStep').value = 'Start with corners and pressure points, then fit and reinforce each panel along the terrain.';
    generateCard();
  }

  function clearGenerator() {
    ['pointA','pointB','drift','constraints','signal','trust','handoff','nextStep'].forEach(id => $(id).value = '');
    generateCard();
  }

  function openRecordDialog(record = null) {
    $('recordDialogTitle').textContent = record ? 'Edit record' : 'Add local record';
    $('recordId').value = record?.id || '';
    $('recordScenario').value = record?.scenarioName || '';
    $('recordFailure').value = record?.failureType || '';
    $('recordWeight').value = record?.repairType || 'Full';
    $('recordOutcome').value = record?.outcomePreference || 'Unresolved';
    $('recordReview').value = record?.reviewState || 'unreviewed';
    $('recordOriginal').value = record?.originalPrompt || '';
    $('recordNotes').value = record?.dashboardNotes || '';
    $('recordDialog').showModal();
  }

  function saveRecord(event) {
    event.preventDefault();
    const existingId = text($('recordId').value);
    const existing = workingRecords.find(r => r.id === existingId);
    const record = normalizeRecord({
      ...(existing || {}),
      id: existingId || `local-${Date.now()}`,
      origin: existing?.origin || 'local-manual',
      scenarioName: $('recordScenario').value,
      failureType: $('recordFailure').value,
      repairType: $('recordWeight').value,
      cardWeightRecommendation: $('recordWeight').value,
      outcomePreference: $('recordOutcome').value,
      reviewState: $('recordReview').value,
      originalPrompt: $('recordOriginal').value,
      dashboardNotes: $('recordNotes').value
    }, existing?.origin || 'local-manual');
    if (existing) workingRecords = workingRecords.map(r => r.id === existing.id ? record : r);
    else workingRecords.push(record);
    saveWorkingRecords(false);
    $('recordDialog').close();
    renderAll();
    flash(existing ? 'Record updated.' : 'Local record added.', 'good');
  }

  function handleRecordAction(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const id = button.dataset.id;
    const record = workingRecords.find(r => r.id === id);
    if (!record) return;
    if (button.dataset.action === 'edit') openRecordDialog(record);
    if (button.dataset.action === 'duplicate') {
      workingRecords.push(normalizeRecord({...clone(record), id:`local-${Date.now()}`, scenarioName:`${record.scenarioName} (copy)`, reviewState:'unreviewed', origin:'local-manual'}, 'local-manual'));
      saveWorkingRecords(false); renderAll(); flash('Record duplicated.', 'good');
    }
    if (button.dataset.action === 'review') {
      const order = ['unreviewed','reviewed','sanitized','public-safe'];
      const current = order.indexOf(record.reviewState);
      record.reviewState = current >= 0 && current < order.length - 1 ? order[current + 1] : record.reviewState;
      record.updatedAt = now();
      saveWorkingRecords(false); renderAll(); flash(`Review state: ${record.reviewState}`, 'good');
    }
    if (button.dataset.action === 'delete' && confirm(`Delete ${record.id}? This cannot be undone unless you exported it.`)) {
      workingRecords = workingRecords.filter(r => r.id !== id);
      saveWorkingRecords(false); renderAll(); flash('Record deleted.', 'bad');
    }
  }

  function updateStorageStatus() {
    let available = false;
    try {
      const key = '__hc_test__'; localStorage.setItem(key,'1'); localStorage.removeItem(key); available = true;
    } catch {}
    $('storageStatus').textContent = available ? 'Available in this browser profile. Nothing is uploaded automatically.' : 'Unavailable or blocked in this browser.';
    $('workingCount').textContent = `${workingRecords.length} working record${workingRecords.length === 1 ? '' : 's'}`;
    const stamp = localStorage.getItem(SAVE_TIME_KEY);
    $('lastSaved').textContent = stamp ? new Date(stamp).toLocaleString() : 'Never';
  }

  function buildExportPayload(records = allRecords()) {
    return {project:'Harness Card V3', appVersion:APP_VERSION, schemaVersion:SCHEMA_VERSION, exportedAt:now(), exportMode:'all-visible', records};
  }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), {href:url, download:filename});
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  }

  function exportJson() { downloadFile(JSON.stringify(buildExportPayload(), null, 2), `harness-card-v${APP_VERSION}-records.json`, 'application/json'); }
  function exportCsv() {
    const headers = ['id','origin','reviewState','createdAt','updatedAt','scenarioName','failureType','repairType','outcomePreference','runnerModel','modelLabelInPayload','originalPrompt','dashboardNotes'];
    const rows = allRecords().map(record => headers.map(key => `"${String(record[key] ?? '').replaceAll('"','""')}"`).join(','));
    downloadFile([headers.join(','), ...rows].join('\n'), `harness-card-v${APP_VERSION}-records.csv`, 'text/csv');
  }

  function clearSavedData() {
    if (!confirm('Clear saved browser data? Export first if you need a backup. Dataset A remains available from the repository.')) return;
    localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SAVE_TIME_KEY);
    workingRecords = [];
    renderAll();
    flash('Saved browser data cleared.', 'bad');
  }

  function resetWorkingView() {
    if (!confirm('Remove all local and imported records from the working view? Dataset A will remain unchanged.')) return;
    workingRecords = [];
    saveWorkingRecords(false);
    renderAll();
    flash('Working view reset to Dataset A.', 'warn');
  }

  async function readImportFile(file) {
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) throw new Error('Import file exceeds the 2 MB safety limit.');
    const payload = JSON.parse(await file.text());
    const schemaVersion = payload?.schemaVersion;
    if (schemaVersion && String(schemaVersion).split('.')[0] !== SCHEMA_VERSION.split('.')[0]) throw new Error(`Unsupported schema version ${schemaVersion}.`);
    const records = Array.isArray(payload) ? payload : payload?.records;
    if (!Array.isArray(records)) throw new Error('Import must be a record array or an object with a records array.');
    if (records.length > MAX_IMPORT_RECORDS) throw new Error(`Import exceeds the ${MAX_IMPORT_RECORDS}-record safety limit.`);
    const seen = new Set();
    const normalized = records.map(record => normalizeRecord({...record, origin:'imported', reviewState:'unreviewed'}, 'imported')).map(record => {
      if (seen.has(record.id)) record.id = `imported-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
      seen.add(record.id); return record;
    });
    pendingImport = normalized;
    $('mergeImportBtn').disabled = false;
    $('replaceImportBtn').disabled = false;
    $('importStatus').textContent = `${normalized.length} validated record${normalized.length === 1 ? '' : 's'} ready. Choose merge or replace.`;
  }

  function mergeImport() {
    if (!pendingImport) return;
    const ids = new Set(workingRecords.map(r => r.id));
    const incoming = pendingImport.map(record => {
      if (ids.has(record.id)) record.id = `imported-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
      ids.add(record.id); return record;
    });
    workingRecords = [...workingRecords, ...incoming];
    finishImport('Imported records merged.');
  }

  function replaceImport() {
    if (!pendingImport || !confirm('Replace all local and imported working records with this validated import? Dataset A will remain separate.')) return;
    workingRecords = pendingImport;
    finishImport('Working records replaced by import.');
  }

  function finishImport(message) {
    pendingImport = null;
    $('importFile').value = '';
    $('mergeImportBtn').disabled = true;
    $('replaceImportBtn').disabled = true;
    $('importStatus').textContent = 'No file selected.';
    saveWorkingRecords(false); renderAll(); flash(message, 'good');
  }

  function clearFilters() {
    ['filterOrigin','filterReview','filterOutcome'].forEach(id => $(id).value = '');
    $('filterSearch').value = '';
    renderRows();
  }

  function bindEvents() {
    $('analyzeBtn').addEventListener('click', analyze);
    $('fillGeneratorBtn').addEventListener('click', fillGeneratorFromAnalysis);
    $('copyRepairBtn').addEventListener('click', () => copyText($('repairOutput').textContent, 'Repair copied.'));
    $('clearAnalyzerBtn').addEventListener('click', () => { $('rawInput').value=''; lastAnalysis=null; $('tokenEstimate').textContent='0'; $('recommendedMode').textContent='—'; $('confidence').textContent='—'; $('reasonList').innerHTML='<li>No analysis yet.</li>'; $('signalList').innerHTML='<span class="pill">none</span>'; $('repairOutput').textContent='No repair generated yet.'; });
    document.querySelectorAll('.mode-tab').forEach(button => button.addEventListener('click', () => {setMode(button.dataset.mode); generateCard();}));
    ['pointA','pointB','drift','constraints','signal','trust','handoff','nextStep'].forEach(id => $(id).addEventListener('input', generateCard));
    $('generateBtn').addEventListener('click', generateCard);
    $('copyGeneratedBtn').addEventListener('click', () => copyText($('generatedCard').textContent, 'Card copied.'));
    $('loadExampleBtn').addEventListener('click', loadExample);
    $('clearGeneratorBtn').addEventListener('click', clearGenerator);
    $('metricScope').addEventListener('change', renderMetrics);
    ['filterOrigin','filterReview','filterOutcome','filterSearch'].forEach(id => $(id).addEventListener('input', renderRows));
    $('clearFiltersBtn').addEventListener('click', clearFilters);
    $('recordRows').addEventListener('click', handleRecordAction);
    $('addRecordBtn').addEventListener('click', () => openRecordDialog());
    $('recordForm').addEventListener('submit', saveRecord);
    $('saveBtn').addEventListener('click', () => saveWorkingRecords(true));
    $('exportJsonBtn').addEventListener('click', exportJson);
    $('exportCsvBtn').addEventListener('click', exportCsv);
    $('clearStorageBtn').addEventListener('click', clearSavedData);
    $('resetSeedBtn').addEventListener('click', resetWorkingView);
    $('importFile').addEventListener('change', async event => { try { await readImportFile(event.target.files[0]); } catch (error) { pendingImport=null; $('mergeImportBtn').disabled=true; $('replaceImportBtn').disabled=true; $('importStatus').textContent=`Import rejected: ${error.message}`; flash('Import rejected.', 'bad'); } });
    $('mergeImportBtn').addEventListener('click', mergeImport);
    $('replaceImportBtn').addEventListener('click', replaceImport);
  }

  async function init() {
    bindEvents();
    try {
      await loadSeedRecords();
    } catch (error) {
      console.error(error);
      $('metrics').innerHTML = `<div class="notice">Seed data could not load. Run the app through a local web server or GitHub Pages instead of opening the file directly.</div>`;
      flash('Seed data could not load.', 'bad');
    }
    workingRecords = loadWorkingRecords();
    generateCard();
    renderAll();
  }

  init();
})();
