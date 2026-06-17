const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const required = [
  'index.html',
  'styles.css',
  'app.js',
  'README.md',
  'SECURITY.md',
  'PRIVACY.md',
  'DISCLAIMER.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'docs/DATASET_B_PROTOCOL.md',
  'docs/EXPORT_SCHEMA.md',
  'src/parser-heuristic.js',
  'tests/parser-heuristic.test.js'
];

for (const file of required) {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) throw new Error(`Missing required file: ${file}`);
  if (fs.statSync(target).size === 0) throw new Error(`Empty required file: ${file}`);
}

for (const file of ['app.js', 'src/parser-heuristic.js']) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  new vm.Script(source, {filename: file});
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = packageJson.version;
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Invalid package version: ${version}`);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');

for (const reference of ['styles.css', 'src/parser-heuristic.js', 'app.js', 'Conversation repair analyzer', 'Local storage and import/export']) {
  if (!index.includes(reference)) throw new Error(`index.html missing required reference: ${reference}`);
}

for (const surface of [index, app, readme, changelog]) {
  if (!surface.includes(version)) throw new Error(`Release version ${version} is not synchronized across public surfaces.`);
}

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = ids.filter((id, position) => ids.indexOf(id) !== position);
if (duplicateIds.length) throw new Error(`Duplicate HTML id values: ${[...new Set(duplicateIds)].join(', ')}`);

for (const labelTarget of [...index.matchAll(/<label\s+for="([^"]+)"/g)].map(match => match[1])) {
  if (!ids.includes(labelTarget)) throw new Error(`Label references missing id: ${labelTarget}`);
}

if (/Public name still under review|Easy upload package note/i.test(index + readme)) {
  throw new Error('Stale public credibility copy remains in the application or README.');
}

const seed = JSON.parse(fs.readFileSync(path.join(root, 'data/seed-data.json'), 'utf8'));
const records = Array.isArray(seed) ? seed : seed.records;
if (!Array.isArray(records) || records.length !== 30) {
  throw new Error('Dataset A must remain a distinct 30-record seeded dataset.');
}

const seedIds = new Set();
for (const record of records) {
  if (!record || typeof record !== 'object') throw new Error('Seed record must be an object.');
  if (!record.id) throw new Error('Seed record missing id.');
  if (seedIds.has(record.id)) throw new Error(`Duplicate seed id: ${record.id}`);
  seedIds.add(record.id);
}

for (const boundary of ['MAX_IMPORT_BYTES', 'MAX_IMPORT_RECORDS', 'seeded-exploratory', 'Merge import', 'Clear saved browser data']) {
  if (!app.includes(boundary) && !index.includes(boundary)) {
    throw new Error(`Missing required reliability boundary: ${boundary}`);
  }
}

for (const forbidden of ['fetch("http', "fetch('http", 'XMLHttpRequest(', 'navigator.sendBeacon(', 'WebSocket(']) {
  if (app.includes(forbidden)) throw new Error(`Unexpected network behavior in app.js: ${forbidden}`);
}

console.log(`Repository validation passed for Harness Card v${version}.`);
