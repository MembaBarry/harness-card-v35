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
  new vm.Script(source, {filename:file});
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (packageJson.version !== '3.5.2') throw new Error(`Expected package version 3.5.2; found ${packageJson.version}`);

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const requiredReferences = ['styles.css', 'src/parser-heuristic.js', 'app.js', 'Conversation repair analyzer', 'Local storage and import/export'];
for (const reference of requiredReferences) {
  if (!index.includes(reference)) throw new Error(`index.html missing required reference: ${reference}`);
}
if (/Public name still under review|Easy upload package note/i.test(index)) throw new Error('Stale public credibility copy remains in index.html.');

const seed = JSON.parse(fs.readFileSync(path.join(root, 'data/seed-data.json'), 'utf8'));
const records = Array.isArray(seed) ? seed : seed.records;
if (!Array.isArray(records) || records.length !== 30) throw new Error('Dataset A must remain a distinct 30-record seeded dataset.');

const ids = new Set();
for (const record of records) {
  if (!record || typeof record !== 'object') throw new Error('Seed record must be an object.');
  if (!record.id) throw new Error('Seed record missing id.');
  if (ids.has(record.id)) throw new Error(`Duplicate seed id: ${record.id}`);
  ids.add(record.id);
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const boundary of ['MAX_IMPORT_BYTES', 'MAX_IMPORT_RECORDS', 'seeded-exploratory', 'Merge import', 'Clear saved browser data']) {
  if (!app.includes(boundary) && !index.includes(boundary)) throw new Error(`Missing required reliability boundary: ${boundary}`);
}

console.log('Repository validation passed.');