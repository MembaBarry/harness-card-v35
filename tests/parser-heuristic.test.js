const assert = require('node:assert/strict');
const { recommend, estimateTokens } = require('../src/parser-heuristic.js');

const cases = [
  {
    name: 'Direct wins for a short obvious format correction',
    input: 'Give me only the code. No explanation. Remove everything else.',
    expected: 'direct'
  },
  {
    name: 'Direct handles a short visible lost-constraint correction',
    input: 'You ignored my materials and budget. Use the constraints I already gave you.',
    expected: 'direct'
  },
  {
    name: 'Mini handles a moderate output contract failure',
    input: `${'The response kept adding commentary. '.repeat(35)} Now answer in the requested format with no intro and no outro.`,
    expected: 'mini'
  },
  {
    name: 'Trust signals retain Full for explicit evidence reconstruction',
    input: 'You invented a source and stated unsupported certainty. Correct it.',
    expected: 'full'
  },
  {
    name: 'Restart signals force Full',
    input: 'Do not restart from scratch. Continue where we left off and preserve current project state.',
    expected: 'full'
  },
  {
    name: 'Repeated correction failure forces Full',
    input: 'I already corrected this twice and you still ignored the current project state.',
    expected: 'full'
  },
  {
    name: 'No decisive signal starts with Direct instead of Full',
    input: 'Please fix the visible mistake and continue.',
    expected: 'direct'
  }
];

for (const testCase of cases) {
  const result = recommend(testCase.input);
  assert.equal(result.mode, testCase.expected, `${testCase.name}: expected ${testCase.expected}, got ${result.mode}`);
  assert.ok(Array.isArray(result.reasons) && result.reasons.length > 0);
  assert.match(result.disclaimer, /lightest repair/i);
  console.log(`PASS: ${testCase.name}`);
}

assert.ok(estimateTokens('one two three') >= 3);
console.log('All parser heuristic tests passed.');