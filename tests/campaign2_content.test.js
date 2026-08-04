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
assert.match(JSON.stringify(cases[0]), /0\.00187g/, 'displayed Case 01 gradient retains five-decimal precision');

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

// --- Residual-defect regression guards (follow-up remediation) -------------
// These evaluate all reachable Campaign 2 dialogue, not a single known line.
// The reachability suite proves every authored node is reachable (zero
// orphans), so collecting all authored dialogue text and player-facing labels
// for a case is equivalent to collecting its reachable dialogue.
function collectTexts(caseData) {
  const out = [];
  for (const source of Object.values(caseData.sources || {})) {
    for (const node of Object.values(source.nodes || {})) {
      if (node.text) out.push(node.text);
    }
  }
  if (caseData.briefing) out.push(caseData.briefing);
  for (const hintKey of ['early', 'mid', 'late']) {
    if (caseData.hints && caseData.hints[hintKey]) out.push(caseData.hints[hintKey]);
  }
  if (caseData.solutionChoice) {
    if (caseData.solutionChoice.prompt) out.push(caseData.solutionChoice.prompt);
    for (const opt of caseData.solutionChoice.options || []) {
      if (opt.response) out.push(opt.response);
    }
  }
  return out;
}
function collectChoiceLabels(caseData) {
  const out = [];
  for (const source of Object.values(caseData.sources || {})) {
    for (const node of Object.values(source.nodes || {})) {
      for (const opt of node.options || []) if (opt.label) out.push(opt.label);
    }
  }
  for (const opt of (caseData.solutionChoice && caseData.solutionChoice.options) || []) {
    if (opt.label) out.push(opt.label);
  }
  for (const d of caseData.diagnoses || []) if (d.label) out.push(d.label);
  return out;
}

// Case 03 (wrong_color_light): red light is never described as absolutely
// "unused" by kelp. Any surviving mention of "unused" must be an explicit
// negation of the absolute claim.
const case03 = cases[2];
const case03Serialized = JSON.stringify(case03);
assert.doesNotMatch(case03Serialized, /passes through the kelp unused/i,
  'Case 03: the absolute "red passes through the kelp unused" claim must not reappear');
assert.doesNotMatch(case03Serialized, /useless red/i, 'Case 03: red is not "useless"');
assert.doesNotMatch(case03Serialized, /darkness with extra steps/i,
  'Case 03: red light is not absolute darkness to the kelp');
for (const t of collectTexts(case03)) {
  if (/\bunused\b/i.test(t)) {
    assert.match(t, /not (?:universally|absolutely)|is not absolutely|not that the kelp cannot/i,
      'Case 03: every "unused" mention must be negated, not absolute — offending text: ' + t.slice(0, 90));
  }
}
// The corrected species-specific comparison must remain present and grounded.
assert.match(case03Serialized, /chlorophyll a and c/, 'Case 03 keeps chlorophyll a/c comparison');
assert.match(case03Serialized, /not (?:universally or absolutely|absolutely) unused/i,
  'Case 03 states red is not universally/absolutely unused');

// Case 06 (first_garden): the mycorrhizal mechanism is a hypothesis, never
// proven; compatible partners are never declared certainly absent; no
// immediate or unscreened living-soil transfer is offered as acceptable.
const case06 = cases[5];
const case06Serialized = JSON.stringify(case06);
assert.doesNotMatch(case06Serialized, /this is the mechanism/i,
  'Case 06: mechanism must not be stated as proven certainty');
assert.doesNotMatch(case06Serialized, /this is what is missing/i,
  'Case 06: absence must not be declared as fact');
assert.doesNotMatch(case06Serialized, /never (?:been )?restored/i,
  'Case 06: partners must not be declared certainly absent because the network "was never restored"');
assert.doesNotMatch(case06Serialized, /transplant living soil/i,
  'Case 06: unscreened living-soil transfer must not be offered');
assert.doesNotMatch(case06Serialized, /\binoculate now\b/i, 'Case 06: no immediate inoculation');
for (const t of collectTexts(case06)) {
  assert.doesNotMatch(t, /\bis the mechanism\b/i,
    'Case 06: mechanism stated as proven — offending text: ' + t.slice(0, 90));
  assert.doesNotMatch(t, /(?:connecting |transport )?mechanism is (?:missing|absent)/i,
    'Case 06: mechanism declared missing/absent as fact — offending text: ' + t.slice(0, 90));
}
// Every choice that PROPOSES a soil-transfer / inoculation intervention (an
// action, not an investigative question) must reference screening, approval,
// controls, or explicit deferral. Investigative labels like "Check regulations
// on inoculation" are not action proposals and are not flagged.
const SAFEGUARD = /screen|approv|control|clear|review|provenance|do not|until|before|propos/i;
for (const label of collectChoiceLabels(case06)) {
  if (/\bliving soil\b|\binoculate\b|inoculation trial|\btransplant\b[^.]*\bsoil\b/i.test(label)) {
    assert.match(label, SAFEGUARD,
      'Case 06: proposed inoculation/soil-transfer choice must reference screening/approval/controls/deferral — offending label: ' + label);
  }
}
// The correct diagnosis is hypothesis-framed, not a proven conclusion.
assert.match(case06.diagnoses.find(d => d.isCorrect).label, /leading explanation|candidate|before concluding|test/i,
  'Case 06 correct diagnosis is framed as a hypothesis to test');

console.log(JSON.stringify({ assertions: 'campaign structure, science boundaries, prohibited content, Case 01 math, Case 03/06 residual-defect regressions', failures: 0 }, null, 2));
