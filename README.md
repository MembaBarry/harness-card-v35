# Harness Card V3

**A local-first AI chat circuit breaker for repairing conversations that drift, loop, lose constraints, overexplain, restart, or become ungrounded.**

Harness Card is used after a human–AI conversation has already begun to fail. It helps the user choose the lightest repair that can restore the conversation without discarding useful state.

- **Direct Correction** fixes a tiny, obvious mistake.
- **Mini Harness** restores an output boundary such as “code only” or “no explanation.”
- **Full Harness** reconstructs shared reality when constraints, trust, continuity, or project state have broken.

The cargo is Human Signal. The card exists to keep it from breaking during a handoff.

## Run it

The app loads its public Dataset A records from JSON, so serve the repository instead of opening `index.html` through `file://`:

```bash
npm run serve
```

Then open `http://localhost:8080`. The same static files are compatible with GitHub Pages.

No account, backend, API key, analytics, telemetry, or cloud transcript storage is required.

## Current release

**3.5.2 — Public Credibility and Reliability Pass**

The repository remains static HTML, CSS, and JavaScript. That keeps it inspectable, portable, inexpensive, dependency-light, and low in attack surface.

## What the application now does

- Analyzes a failure window locally and recommends Direct, Mini, or Full.
- Displays the heuristic’s reasons, detected signals, token estimate, and confidence.
- Generates copyable repair cards manually or from the analyzer.
- Keeps the thirty seeded Dataset A records separate from working records.
- Adds, edits, duplicates, reviews, and deletes local records.
- Shows browser-storage status and separates save, clear, and reset actions.
- Exports versioned JSON and CSV.
- Validates JSON imports with size and record-count limits.
- Requires an explicit choice between merge and replace.

The analyzer is a deterministic heuristic, **not AI diagnosis**. Human judgment remains final.

## What this repository is

This repository has four bounded roles:

1. A working public conversation-repair tool.
2. A local evidence instrument for sanitized recovery outcomes.
3. A research artifact that preserves failures, limitations, contradictions, and version history.
4. A feeder into a larger Human Signal continuity investigation after human review.

It is not the entire core system, a cloud platform, an autonomous research authority, or proof that the method always works.

## Evidence boundary

### Dataset A — exploratory forced-failure simulations

The repository contains 30 seeded records:

- Harness preferred: 25
- Mixed / close: 2
- Baseline preferred: 3

These records are useful design evidence, not proof. The failures were forced; scenarios repeat; the baseline was deliberately simple; evaluations were model-generated and non-independent; and evaluator bias is possible.

Dataset A remains a separate reference dataset. Local and imported records do not silently alter its published metrics.

### Dataset B — real conversation recovery tests

The next evidence stage uses naturally occurring failures, frozen sanitized context, stronger baselines, human scoring, persistence checks, handoff results, and explicit privacy review. See [`docs/DATASET_B_PROTOCOL.md`](docs/DATASET_B_PROTOCOL.md).

The research question is:

> Which repair weight works best for which failure class?

Negative results remain evidence.

## Privacy and storage

The app does not automatically upload conversations or usage data. Working records may be saved in browser `localStorage`. Exported files leave the app only when the user chooses to download, copy, or share them.

Do not paste passwords, API keys, private legal or medical data, confidential information, or anything you do not want stored on the device. Prefer sanitized outcomes over raw conversations.

See [`PRIVACY.md`](PRIVACY.md) and [`SECURITY.md`](SECURITY.md).

## Validation

```bash
npm test
npm run validate
```

Validation checks:

- Direct/Mini/Full parser regression cases;
- JavaScript syntax;
- release and schema boundaries;
- required public files and application references;
- seed-data shape and unique IDs;
- preservation of the thirty-record Dataset A boundary;
- import-size, import-count, storage, and evidence-separation safeguards.

## Main files

- `index.html` — accessible static application shell
- `styles.css` — responsive interface styles
- `app.js` — local storage, records, import/export, and interface behavior
- `src/parser-heuristic.js` — testable repair-weight heuristic
- `tests/parser-heuristic.test.js` — Direct/Mini/Full regression tests
- `data/seed-data.json` and `.csv` — Dataset A records
- `docs/DATASET_B_PROTOCOL.md` — real-world recovery protocol
- `docs/EXPORT_SCHEMA.md` — versioned export contract
- `CHANGELOG.md` — release history
- `CONTRIBUTING.md` — architecture, privacy, and evidence boundaries

## What is deliberately not being built

No accounts, cloud storage, payments, subscriptions, external AI APIs, transcript collection, analytics, telemetry, tracking, framework rewrite, browser extension, enterprise dashboard, mobile app, or multi-agent orchestration.

## Trust rule

Keep these distinctions visible:

- source is not interpretation;
- observation is not a finding;
- a pattern is not proof;
- a candidate is not Canon;
- repetition is not verification;
- confidence is not certainty;
- AI judgment is advisory;
- human review remains authoritative.

Harness Card should make failure easier to repair without pretending the repair has been proven universally effective.
