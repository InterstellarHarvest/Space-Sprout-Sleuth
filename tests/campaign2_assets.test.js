const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync('campaign_2_data.js', 'utf8');
const context = {};
vm.createContext(context);
new vm.Script(source + '\n;globalThis.__C2__ = CAMPAIGN_2_DATA; globalThis.__FRAMES__ = CAMPAIGN_2_FRAMES;')
  .runInContext(context);

const refs = [...new Set(source.match(/sprites\/c2\/[^"'\\\s]+/g) || [])]
  .filter(ref => !ref.includes('*'));
for (const ref of refs) assert.ok(fs.existsSync(ref), 'asset exists: ' + ref);

for (const caseData of context.__C2__.cases) {
  for (const clue of caseData.clues) {
    const sprites = clue.sprites || {};
    if (!sprites.spritesheetJson) continue;
    const json = JSON.parse(fs.readFileSync(sprites.spritesheetJson, 'utf8'));
    const character = path.basename(path.dirname(sprites.spritesheet));
    const embeddedKey = sprites.spritesheet.includes('spritesheet_unmasked')
      ? 'crew_nova_unmasked'
      : 'crew_' + character;
    const embedded = context.__FRAMES__[embeddedKey];
    assert.ok(embedded, 'embedded frames exist for ' + character);
    assert.deepEqual(
      JSON.parse(JSON.stringify(embedded.map(item => item.frame))),
      json.frames.map(item => item.frame),
      'embedded and JSON frame coordinates agree for ' + character
    );
  }
}

console.log(JSON.stringify({ referencedAssets: refs.length, failures: 0 }, null, 2));
