const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const required = [
  'index.html',
  'README.md',
  'SECURITY.md',
  'PRIVACY.md',
  'DISCLAIMER.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'docs/DATASET_B_PROTOCOL.md',
  'src/parser-heuristic.js',
  'tests/parser-heuristic.test.js'
];

for (const file of required) {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) throw new Error(`Missing required file: ${file}`);
  if (fs.statSync(target).size === 0) throw new Error(`Empty required file: ${file}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (packageJson.version !== '3.5.2') throw new Error(`Expected package version 3.5.2; found ${packageJson.version}`);

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

console.log('Repository validation passed.');
