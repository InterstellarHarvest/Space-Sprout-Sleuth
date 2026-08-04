const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('index.html', 'utf8');
assert.match(source, /const m = spriteSrc\.match\(\/\^sprites\\\/c2\\\/\(\\w\+\)\\\/spritesheet\\\.png\$\/\)/);
assert.match(source, /const totalClues = caseData\.clues\.length;[\s\S]*?if \(foundClues < totalClues\)[\s\S]*?return;[\s\S]*?showDiagnosis\(\);/);
assert.match(source, /if \(choice\.isCorrect\) \{[\s\S]*?showCorrectAnswer\(\);/);
assert.match(source, /if \(caseData\.solutionChoice\) \{[\s\S]*?showSolutionChoice\(caseData, score\)/);
assert.match(source, /STATE\.caseState\.solutionIdx = selectedSolution;[\s\S]*?saveState\(\);/);
assert.match(source, /STATE\.currentCampaign !== 1 \|\| !caseData\.solutionChoice[\s\S]*?showResolvedScene\(caseData\)/);
assert.match(source, /if \(STATE\.currentCampaign === 1\) showResolvedScene\(caseData\);[\s\S]*?opt\.response/);
assert.match(source, /sceneImg\.alt = STATE\.currentCampaign === 1[\s\S]*?caseData\.sceneDescription/);
assert.match(source, /resolvedSceneDescription/);
assert.match(source, /role="img" aria-label=/);
assert.match(
  source,
  /STATE\.currentCampaign === 1 && source\.type === 'conversation'[\s\S]*?mood === 'angry'[\s\S]*?source\.nodes\.locked[\s\S]*?mood === 'annoyed'[\s\S]*?source\.nodes\.annoyed/,
  'Campaign 2 authored mood and lock nodes are connected through persisted conversation mood'
);

const scripts = [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(match => match[1])
  .filter(code => code.trim());
assert.ok(scripts.length);
for (const code of scripts) {
  // External scripts have empty bodies and are filtered out.
  new Function(code);
}

console.log(JSON.stringify({ assertions: 12, failures: 0, verified: ['gating', 'solution persistence', 'delayed resolved scene', 'sprite matcher', 'canvas and scene accessibility', 'mood-node routing', 'inline syntax'] }, null, 2));
