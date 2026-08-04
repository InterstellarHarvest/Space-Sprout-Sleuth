const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('campaign_2_data.js', 'utf8');
const context = {};
vm.createContext(context);
new vm.Script(source + '\n;globalThis.__C2__ = CAMPAIGN_2_DATA; globalThis.__HH__ = CAMPAIGN_2_HEAVY_HANDS_MODEL;')
  .runInContext(context);

const campaign = context.__C2__;
const cases = campaign.cases;
assert.equal(cases.length, 6);
assert.deepEqual(
  Array.from(cases, item => item.id),
  ['heavy_hands', 'missing_dance', 'wrong_color_light', 'silent_grove', 'too_clean_room', 'first_garden']
);

for (const caseData of cases) {
  assert.equal(caseData.clues.length, 5, caseData.id + ' has five formal clues');
  assert.equal(new Set(caseData.clues.map(clue => clue.clueTag)).size, 5, caseData.id + ' clue tags are unique');
  assert.equal(caseData.diagnoses.filter(item => item.isCorrect).length, 1, caseData.id + ' has one correct diagnosis');
  assert.ok(caseData.sceneDescription, caseData.id + ' has meaningful scene alternative text');
}

const hh = context.__HH__;
assert.ok(Math.abs(hh.rotationRpm - 2.8896592893) < 1e-9);
assert.ok(Math.abs(hh.topAccelerationG - 2.0990662517) < 1e-9);
assert.ok(Math.abs(hh.midpointAccelerationG - 2.1) < 1e-12);
assert.ok(Math.abs(hh.baseAccelerationG - 2.1009337483) < 1e-9);
assert.ok(Math.abs(hh.gradientDeltaG - 0.0018674967) < 1e-9);

const text = JSON.stringify(campaign);
for (const prohibited of [
  /Case 6b|Case 6\/6b/i,
  /Cesium-137|cobalt-60|Co-60/i,
  /\bmSv(?:\/day|\/year)\b/i,
  /wood wide web/i,
  /technically illegal|Inoculate now/i,
  /only bumblebees/i,
  /pores (?:open|stay sealed)|sealed pores/i,
  /sprites_c2/
]) {
  assert.doesNotMatch(text, prohibited);
}

assert.match(JSON.stringify(cases[1]), /FICTIONAL TELLUVIAN RECORD/);
assert.match(JSON.stringify(cases[2]), /chlorophyll a and c/);
assert.match(JSON.stringify(cases[3]), /ESTABLISHED EARTH SCIENCE/);
assert.match(JSON.stringify(cases[4]), /<0\.01 mGy\/day/);
assert.doesNotMatch(cases[5].solutionChoice.options[1].label, /inoculate now|without approval|paperwork after/i);
assert.match(cases[5].solutionChoice.options[1].response, /After clearance/);

console.log(JSON.stringify({ assertions: 'campaign structure, science boundaries, prohibited content, Case 01 math', failures: 0 }, null, 2));
