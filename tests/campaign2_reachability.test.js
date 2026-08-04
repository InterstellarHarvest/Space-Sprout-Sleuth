const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = {};
vm.createContext(context);
const source = fs.readFileSync('campaign_2_data.js', 'utf8');
new vm.Script(source + '\n;globalThis.__C2__ = CAMPAIGN_2_DATA;').runInContext(context);

function reachableNodes(sourceData) {
  const seen = new Set();
  const queue = ['start'];
  while (queue.length) {
    const id = queue.shift();
    if (seen.has(id)) continue;
    assert.ok(sourceData.nodes[id], 'reachable node exists: ' + id);
    seen.add(id);
    for (const option of sourceData.nodes[id].options || []) {
      assert.ok(sourceData.nodes[option.goto], id + ' resolves goto ' + option.goto);
      // Requirements are unlock conditions, not graph edges. Each clue and flag
      // is audited separately below; including the edge proves no authored node
      // becomes structurally orphaned behind an optional branch.
      queue.push(option.goto);
    }
  }
  return seen;
}

for (const caseData of context.__C2__.cases) {
  const tags = new Set(caseData.clues.map(clue => clue.clueTag));
  const revealed = new Set();
  for (const [sourceId, sourceData] of Object.entries(caseData.sources)) {
    const reachable = reachableNodes(sourceData);
    for (const [nodeId, node] of Object.entries(sourceData.nodes)) {
      if (!reachable.has(nodeId)) {
        assert.match(nodeId, /^(annoyed|locked|exit_cold|recovery)$/,
          caseData.id + ':' + sourceId + '.' + nodeId + ' is either graph-reachable or an intentional runtime mood node');
      }
      if (node.revealsClue) {
        assert.ok(tags.has(node.revealsClue), 'reveal references a formal clue');
        if (reachable.has(nodeId)) revealed.add(node.revealsClue);
      }
      for (const option of node.options || []) {
        const req = option.requires || {};
        if (req.clueFound) assert.ok(tags.has(req.clueFound), 'clue dependency is declared');
      }
    }
  }
  assert.deepEqual([...revealed].sort(), [...tags].sort(), caseData.id + ' exposes every formal clue');
}

const finalCase = context.__C2__.cases[5];
assert.ok(finalCase.sources.database.nodes.mycorrhizal_entry.options.some(
  option => option.goto === 'biosafety' && option.requires && option.requires.clueFound === 'MYCORRHIZAL_NETWORK'
));
assert.ok(finalCase.sources.database.nodes.start.options.some(
  option => option.goto === 'mycorrhizal_entry' && option.requires && option.requires.clueFound === 'CHEMICAL_DISCONNECTION'
));
assert.ok(finalCase.solutionChoice.options[2].requires.clueFound === 'DATABASE_PRECEDENT');

console.log(JSON.stringify({ cases: 6, formalCluesReachable: 30, failures: 0 }, null, 2));
