const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('index.html', 'utf8');
const campaign2Source = fs.readFileSync('campaign_2_data.js', 'utf8');
let assertions = 0;
function matches(pattern, message) {
  assertions++;
  assert.match(source, pattern, message);
}
function excludes(pattern, message) {
  assertions++;
  assert.doesNotMatch(source, pattern, message);
}

matches(
  /if \(idx === 6\) return STATE\.completedCases\.some\(cc => cc\.caseId === 'alien1'\);/,
  'Case 07 unlock requires completed Case 06'
);
excludes(
  /if \(idx === 6\)[^\n]*STATE\.currentCase\s*>=\s*6/,
  'Case 07 cannot unlock from a bare currentCase value'
);
matches(
  /const totalClues = caseData\.clues\.length;[\s\S]*?if \(foundClues < totalClues\)[\s\S]*?return;[\s\S]*?showDiagnosis\(\);/,
  'diagnosis remains unavailable until every formal clue is collected'
);
matches(
  /const choice = caseData\.diagnoses\[selectedDiagnosis\];[\s\S]*?if \(choice\.isCorrect\) \{[\s\S]*?showCorrectAnswer\(\);/,
  'only the diagnosis marked correct enters the completion path'
);
matches(
  /STATE\.caseState\.solutionIdx = selectedSolution;[\s\S]*?if \(opt\.bonusPoints\)[\s\S]*?\}[\s\S]*?saveState\(\);/,
  'all interventions are persisted after optional bonus handling'
);
matches(/function resumeSolvedCase\(\)/, 'solved-case resume has a dedicated handoff');
matches(
  /else if \(STATE\.caseState\.diagnosed\) \{[\s\S]*?resumeSolvedCase\(\);/,
  'resume does not increment past a diagnosed final case'
);
matches(
  /caseData\.solutionChoice && STATE\.caseState\.solutionIdx < 0[\s\S]*?showSolutionChoice\(caseData, score\)/,
  'resume returns an unchosen intervention to the choice screen'
);
matches(
  /else \{[\s\S]*?showExplanation\(caseData, score\);[\s\S]*?\}\n  \}/,
  'resume returns a chosen intervention to the explanation'
);
matches(/function showCaseVictory\(\)/, 'authored final-case victory has a renderer');
matches(/victory\.podAwakening, victory\.zelkethClosing/, 'both authored final narrative fields are rendered');
matches(/onclick="SSS\.finishFinalCase\(\)"/, 'authored final narrative advances to the final handoff');
matches(/function finishFinalCase\(\)/, 'final-case completion has a dedicated handoff');
matches(/showRankUp\(oldRank, 'showVictory'\)/, 'final rank-up leads to campaign victory');
matches(/const completedCaseIndex = nextAction === 'showVictory' \? STATE\.currentCase : STATE\.currentCase - 1/, 'final rank-up uses the final case flavor text');
matches(/if \(shouldRankUp\) STATE\.rank\+\+;[\s\S]*?saveState\(\);/, 'final rank is saved before results');
matches(/showCaseVictory,\n    finishFinalCase,\n    showVictory,/, 'new final-flow handlers are exposed to inline controls');
matches(/STATE\.campaign1Complete = true;\n      saveState\(\);/, 'Campaign 1 victory persists the Campaign 2 unlock');
matches(/INCOMING TRANSMISSION/, 'Campaign 1 victory communicates the unlocked follow-on campaign');
matches(/function caseLabel\(idx\) \{\n      return idx \+ 1;\n    \}/, 'play-log events use curriculum case numbers 6 and 7');
excludes(/function caseLabel\(idx\)[\s\S]{0,120}return '6[ab]'/, 'former 6a/6b labels are not emitted as current telemetry');
assertions++;
assert.doesNotMatch(campaign2Source, /Case File 6\/6b|Cases 6(?:\/| and )6b/, 'Campaign 2 player-facing continuity does not use 6b as current numbering');
assertions++;
assert.match(campaign2Source, /SAA Cases 06\\u201307/, 'Campaign 2 continuity identifies the predecessor sequence as Cases 06–07');
const finalFunction = source.slice(
  source.indexOf('function finishFinalCase()'),
  source.indexOf('function nextCase()')
);
assertions++;
assert.doesNotMatch(finalFunction, /STATE\.currentCase\+\+/, 'final handoff does not increment beyond the case array');

console.log(JSON.stringify({
  assertions,
  failures: 0,
  verified: [
    'strict Case 06 prerequisite',
    'zero-bonus intervention persistence',
    'diagnosed-case resume',
    'authored Case 07 victory narrative',
    'Xenobotanist rank-up handoff',
    'Campaign 2 unlock persistence'
  ]
}, null, 2));
