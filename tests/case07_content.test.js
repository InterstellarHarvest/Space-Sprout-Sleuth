const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = {};
vm.createContext(context);
const dataSource = fs.readFileSync('space_sprout_sleuth_data.js', 'utf8');
new vm.Script(dataSource + '\n;globalThis.__GAME_DATA__ = GAME_DATA;', {
  filename: 'space_sprout_sleuth_data.js'
}).runInContext(context);

let assertions = 0;
function check(actual, expected, message) {
  assertions++;
  assert.equal(actual, expected, message);
}
function ok(value, message) {
  assertions++;
  assert.ok(value, message);
}
function matches(value, pattern, message) {
  assertions++;
  assert.match(value, pattern, message);
}
function excludes(value, pattern, message) {
  assertions++;
  assert.doesNotMatch(value, pattern, message);
}

const cases = context.__GAME_DATA__.cases;
const case07 = cases.find(candidate => candidate.id === 'alien2');
ok(case07, 'runtime Case 07 (alien2) must exist');
check(cases.length, 7, 'Campaign 1 retains seven cases');
check(cases[6].id, 'alien2', 'Case 07 remains the final Campaign 1 runtime case');
check(case07.name, 'The Gift', 'Case 07 title remains The Gift');
check(case07.isFinalBonus, true, 'Case 07 remains the final bonus case');

const expectedSources = ['crew', 'sensors', 'plants', 'logs'];
check(Object.keys(case07.sources).sort().join(','), expectedSources.sort().join(','), 'all four authored sources exist');
check(case07.clues.length, 4, 'Case 07 has four formal clues');
const clueTags = case07.clues.map(clue => clue.clueTag);
check(new Set(clueTags).size, clueTags.length, 'formal clue tags are unique');
check(
  clueTags.sort().join(','),
  ['GERMINATION_COMPOUND', 'MISSING_VOCS', 'PROXIMITY_REQUIRED', 'WAITING_FOR_TRIGGER'].sort().join(','),
  'formal clue inventory matches the intended evidence chain'
);

const revealSites = Object.fromEntries(clueTags.map(tag => [tag, []]));
for (const [sourceKey, source] of Object.entries(case07.sources)) {
  ok(source.nodes.start, sourceKey + ' source has an entry node');
  for (const [nodeId, node] of Object.entries(source.nodes)) {
    if (node.revealsClue) {
      ok(clueTags.includes(node.revealsClue), sourceKey + '.' + nodeId + ' reveals a declared clue');
      revealSites[node.revealsClue].push(sourceKey + '.' + nodeId);
    }
    for (const option of node.options || []) {
      ok(source.nodes[option.goto], sourceKey + '.' + nodeId + ' resolves goto ' + option.goto);
      if (option.requires && option.requires.clueFound) {
        ok(clueTags.includes(option.requires.clueFound), sourceKey + '.' + nodeId + ' uses a declared clue prerequisite');
      }
    }
  }
}

for (const tag of clueTags) {
  ok(revealSites[tag].length >= 2, tag + ' has at least two independent reveal nodes');
}
ok(revealSites.PROXIMITY_REQUIRED.some(site => site.startsWith('crew.')), 'proximity clue has a crew route');
ok(revealSites.MISSING_VOCS.every(site => site.startsWith('sensors.')), 'trace-compound clue is grounded in sensor evidence');
ok(revealSites.WAITING_FOR_TRIGGER.every(site => site.startsWith('plants.')), 'dormancy clue is grounded in specimen evidence');
ok(revealSites.GERMINATION_COMPOUND.every(site => site.startsWith('logs.')), 'compound clue is grounded in archive evidence');

const correctDiagnoses = case07.diagnoses.filter(diagnosis => diagnosis.isCorrect);
check(correctDiagnoses.length, 1, 'exactly one diagnosis is correct');
check(correctDiagnoses[0].id, 'germination_compound', 'the supported diagnosis is the missing germination cue');
check(case07.diagnoses.length, 4, 'one correct diagnosis and three distractors are present');

const allText = JSON.stringify(case07);
matches(allText, /viable seed can remain dormant/i, 'explanation distinguishes viability from germination');
matches(allText, /analogies, not proof|do not prove the alien mechanism/i, 'Earth analogies are explicitly bounded');
matches(allText, /metaphor/i, 'family-language is explicitly identified as metaphor');
matches(allText, /not a general germination trigger/i, 'rhizobial nodulation is not presented as germination');
matches(allText, /asymbiotic laboratory germination/i, 'orchid laboratory exceptions are acknowledged');
matches(allText, /depending on both species/i, 'gut-passage outcomes are presented as species dependent');
matches(allText, /fire does not guarantee/i, 'fire and smoke cues are not universalized');
matches(allText, /preferentially feed relatives/i, 'mother-tree claims are qualified');
matches(allText, /not be treated\nas an ordinary Earth plant VOC|not presented as an ordinary Earth VOC/i, 'the fictional 890 Da cue is not misclassified as an Earth VOC');
matches(allText, /cannot pass through walls or closed compartments/i, 'sealed barriers block cue transport');
excludes(allText, /can (?:pass|drift|move) through (?:walls|the hull)/i, 'the cue does not propagate through sealed barriers');
excludes(allText, /formula tells us the full structure|formula gives us the full structure/i, 'molecular formula is not treated as a complete structure');
excludes(allText, /legume seeds won't germinate|trees have families/i, 'corrected categorical biology claims do not recur');

const mass = 47 * 12.011 + 63 * 1.0080 + 5 * 14.007 + 8 * 15.999 + 2 * 32.06;
check(Number(mass.toFixed(3)), 890.168, 'C47H63N5O8S2 average molecular mass is calculated correctly');
matches(allText, /890\.17 Da/, 'displayed molecular mass rounds to 890.17 Da');
excludes(allText, /862\.15|847 amu/i, 'obsolete molecular-mass values are absent');
check(Number(((12 / 847) * 100).toFixed(1)), 1.4, '12 of 847 identifiers rounds to 1.4 percent');
matches(allText, /12 ÷ 847 × 100 = 1\.416\.\.\.%/, 'the trace-compound percentage shows its calculation');
matches(allText, /Temperature[\s\S]{0,80}18\.4°C[\s\S]{0,80}18\.2°C[\s\S]{0,80}\+0\.2°C/, 'temperature comparison uses the correct signed difference');
matches(allText, /Humidity[\s\S]{0,80}71%[\s\S]{0,80}72%[\s\S]{0,80}-1 percentage point/, 'humidity comparison uses percentage points');

const solution = case07.solutionChoice;
check(solution.options.length, 3, 'three interventions are compared');
check(solution.options.map(option => option.bonusPoints).join(','), '10,5,0', 'intervention scores preserve the intended ranking');
for (const option of solution.options) {
  matches(option.response, /authoriz|consent/i, option.label + ' includes joint authorization or consent');
  matches(option.response, /contain|closed|sealed|screen|verif|validat/i, option.label + ' includes verification or containment');
}
matches(solution.options[0].response, /sealed transfer line less than three meters/i, 'preferred proximity intervention is physically supported');
matches(solution.options[0].response, /can be stopped before the commitment threshold/i, 'preferred intervention is reversible before commitment');
matches(solution.options[1].response, /purity and dosage uncertainty/i, 'extraction risk is explicit');
matches(solution.options[2].response, /formula alone is rejected/i, 'synthesis does not proceed from formula alone');
matches(solution.options[2].response, /connectivity and stereochemistry/i, 'synthesis requires structural and stereochemical validation');

const timingText = case07.sources.logs.nodes.cultivation.text + '\n' +
  case07.sources.logs.nodes.triggers.text + '\n' +
  solution.options.map(option => option.response).join('\n');
matches(timingText, /1 Zhel'ii cycle ≈ 6 Earth hours/, 'fictional cycle has an explicit Earth-hour conversion');
matches(timingText, /2-4 cycles \(12-24 hours\)/, 'first visible response timing is internally converted');
matches(timingText, /4-6 cycles[\s\S]*24-36 Earth hours/, 'stabilization timing is internally converted');
matches(case07.victory.podAwakening, /Between 12 and 24 Earth hours/, 'victory sequence matches first-response timing');
matches(case07.victory.podAwakening, /next 24 to 36 hours/, 'victory sequence matches stabilization timing');
check(case07.rankUpText.includes('Xenobotanist'), true, 'the final rank-up text names Xenobotanist');

console.log(JSON.stringify({
  assertions,
  failures: 0,
  sources: expectedSources,
  mandatoryClues: clueTags,
  optionalFormalClues: 0,
  revealSites,
  molecularMassDa: Number(mass.toFixed(3)),
  traceCoveragePercent: Number(((12 / 847) * 100).toFixed(1)),
  interventionBonuses: solution.options.map(option => option.bonusPoints)
}, null, 2));
