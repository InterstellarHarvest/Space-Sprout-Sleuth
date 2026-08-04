// Campaign 2 dialogue reachability.
//
// This test replaces the former orphaned-mood-node whitelist. The old test
// exempted any node named /^(annoyed|locked|exit_cold|recovery)$/ from the
// reachability check, which let unreachable annoyed/locked nodes pass as if
// they were playable. That exemption is removed. Instead we SIMULATE the
// runtime mood engine (index.html getStartNode + applyNodeEffects) and prove,
// from actual dialogue data and personality thresholds, that every authored
// node — including all 12 configured annoyed/locked mood nodes — is reachable
// from the initial dialogue state through authored choices and legitimate
// conversation re-entry. Each mood node is reported with a valid state path.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = {};
vm.createContext(context);
const base = fs.readFileSync('space_sprout_sleuth_data.js', 'utf8');
const c2 = fs.readFileSync('campaign_2_data.js', 'utf8');
new vm.Script(base + '\n' + c2 +
  '\n;globalThis.__C2__ = CAMPAIGN_2_DATA; globalThis.__PERS__ = GAME_DATA.personalities;')
  .runInContext(context);

const CAMPAIGN = context.__C2__;
const PERSONALITIES = context.__PERS__;

// --- Runtime mood semantics (mirror of index.html) ------------------------
function moodLabel(moodValue, personality) {
  const p = PERSONALITIES[personality] || PERSONALITIES.patient;
  if (p.lockThreshold !== null && moodValue <= -p.lockThreshold) return 'angry';
  if (moodValue <= -p.annoyThreshold) return 'annoyed';
  if (moodValue >= 2) return 'friendly';
  return 'neutral';
}

// getStartNode: which node the runtime routes to when a conversation opens
// or re-opens, given the persisted mood and locked flag.
function startNodeFor(source, mood, locked) {
  const label = moodLabel(mood, source.personality);
  if (label === 'angry' && source.nodes.locked) return 'locked';
  if (label === 'annoyed' && source.nodes.annoyed) return 'annoyed';
  if (locked && source.nodes.locked) return 'locked';
  return 'start';
}

// Explore every reachable (node, first-visit set, mood, locked) state for a
// conversation source. moodShift applies only on first visit of a node (the
// runtime tracks nodesVisited); setMood/locksSource apply on every arrival;
// ending a conversation re-enters through startNodeFor. Requirements are
// treated as satisfiable — a determined player can find clues, set flags, and
// be any species — because none of the mood-triggering choices are gated.
// Returns: reachable node id set, and shortest path (node id list, with
// '↺<id>' marking a conversation re-entry) to the first arrival at each node.
function exploreSource(source) {
  const nodes = source.nodes;
  const personality = source.personality;
  const startMood = source.startMood || 0;
  const p = PERSONALITIES[personality] || PERSONALITIES.patient;

  const moodNodeIds = Object.keys(nodes).filter(id => nodes[id].moodShift !== undefined);
  const bitOf = new Map(moodNodeIds.map((id, i) => [id, 1 << i]));

  const seenStates = new Set();
  const firstPathTo = new Map();
  const reachable = new Set();

  const first = { id: startNodeFor(source, startMood, false), visited: 0, mood: startMood, locked: false, path: [] };
  // BFS (queue) so recorded paths are shortest.
  const queue = [first];
  while (queue.length) {
    const s = queue.shift();
    const node = nodes[s.id];
    assert.ok(node, source.speaker + ' resolves node ' + s.id);

    // Apply arrival effects.
    let mood = s.mood;
    let visited = s.visited;
    let locked = s.locked;
    const bit = bitOf.get(s.id) || 0;
    if (node.moodShift !== undefined && !(visited & bit)) { mood += node.moodShift; visited |= bit; }
    if (node.setMood === 'neutral') mood = 0;
    else if (node.setMood === 'annoyed') mood = Math.min(mood, -p.annoyThreshold);
    else if (node.setMood === 'angry') mood = -(p.lockThreshold || 5);
    if (node.locksSource === true) locked = true;
    if (node.locksSource === false) locked = false;

    const path = s.path.concat(s.id);
    const stateKey = s.id + '|' + visited + '|' + mood + '|' + (locked ? 1 : 0);
    if (seenStates.has(stateKey)) continue;
    seenStates.add(stateKey);

    reachable.add(s.id);
    if (!firstPathTo.has(s.id)) firstPathTo.set(s.id, path);

    const options = node.options || [];
    const ends = node.endsConversation === true || options.length === 0;
    if (!ends) {
      for (const opt of options) {
        assert.ok(nodes[opt.goto], source.speaker + ':' + s.id + ' resolves goto ' + opt.goto);
        queue.push({ id: opt.goto, visited, mood, locked, path });
      }
    } else {
      const next = startNodeFor(source, mood, locked);
      queue.push({ id: next, visited, mood, locked, path: path.concat('↺') });
    }
  }
  return { reachable, firstPathTo };
}

// Pure option-edge reachability from 'start' (a "neutral walkthrough"): the set
// of nodes a player reaches without ever entering a negative-mood state. Used
// to prove formal clues never depend on a bad mood.
function neutralReachable(source) {
  const seen = new Set();
  const queue = ['start'];
  while (queue.length) {
    const id = queue.shift();
    if (seen.has(id) || !source.nodes[id]) continue;
    seen.add(id);
    for (const opt of source.nodes[id].options || []) queue.push(opt.goto);
  }
  return seen;
}

const report = { cases: 0, sources: 0, moodNodes: [], orphans: 0, formalCluesReachable: 0 };

for (const caseData of CAMPAIGN.cases) {
  report.cases++;
  const tags = new Set(caseData.clues.map(clue => clue.clueTag));
  const revealedNeutral = new Set();

  for (const [sourceId, source] of Object.entries(caseData.sources)) {
    // Neutral (no negative mood) walkthrough for every source type: pure
    // option-edge reachability from 'start'. Mood nodes are never goto-linked,
    // so this set excludes them — proving formal clues do not require a bad mood.
    const neutral = neutralReachable(source);

    // Graph edges resolve, clue declarations are valid, and every formal clue
    // is exposed on the neutral walkthrough.
    for (const [nodeId, node] of Object.entries(source.nodes || {})) {
      for (const opt of node.options || []) {
        assert.ok(source.nodes[opt.goto], caseData.id + ':' + sourceId + '.' + nodeId + ' resolves goto ' + opt.goto);
        if (opt.requires && opt.requires.clueFound) assert.ok(tags.has(opt.requires.clueFound), 'clue dependency is declared');
      }
      if (node.revealsClue) {
        assert.ok(tags.has(node.revealsClue), 'reveal references a formal clue');
        if (neutral.has(nodeId)) revealedNeutral.add(node.revealsClue);
      }
    }

    if (source.type !== 'conversation') {
      // Non-mood sources (terminal/archive/action): every node must be
      // reachable through option edges — no whitelist.
      for (const nodeId of Object.keys(source.nodes || {})) {
        if (!neutral.has(nodeId)) {
          report.orphans++;
          assert.fail(caseData.id + ':' + sourceId + '.' + nodeId + ' is orphaned (unreachable via option edges)');
        }
      }
      continue;
    }
    report.sources++;

    const { reachable, firstPathTo } = exploreSource(source);

    // (1) No authored node is orphaned — proven by state exploration, not by a
    //     name whitelist. Every node must be reachable through real play,
    //     including mood routing and conversation re-entry.
    for (const nodeId of Object.keys(source.nodes)) {
      if (!reachable.has(nodeId)) {
        report.orphans++;
        assert.fail(caseData.id + ':' + sourceId + '.' + nodeId +
          ' is orphaned — unreachable through authored choices, mood routing, and re-entry');
      }
    }

    // (2) Every configured annoyed/locked mood node is reachable, with a path.
    for (const moodId of ['annoyed', 'locked']) {
      if (!source.nodes[moodId]) continue;
      assert.ok(reachable.has(moodId),
        caseData.id + ':' + sourceId + '.' + moodId + ' mood node must be reachable via state changes');
      const p = PERSONALITIES[source.personality];
      const threshold = moodId === 'locked' ? -(p.lockThreshold) : -(p.annoyThreshold);
      // A locked node is only meaningful for a personality that can lock.
      if (moodId === 'locked') {
        assert.notEqual(p.lockThreshold, null,
          caseData.id + ':' + sourceId + ' has a locked node but a non-locking personality');
      }
      report.moodNodes.push({
        case: caseData.id,
        source: sourceId,
        speaker: source.speaker,
        node: moodId,
        personality: source.personality,
        threshold,
        path: firstPathTo.get(moodId).join(' → ')
      });
    }
  }

  assert.deepEqual([...revealedNeutral].sort(), [...tags].sort(),
    caseData.id + ' exposes every formal clue on a neutral (non-negative-mood) path');
  report.formalCluesReachable += revealedNeutral.size;
}

// Exactly the 12 authored mood nodes are configured and all are verified.
assert.equal(report.moodNodes.length, 12,
  'exactly 12 configured annoyed/locked mood nodes verified reachable, found ' + report.moodNodes.length);

// Preserved structural guarantees for the final case's database gating.
const finalCase = CAMPAIGN.cases[5];
assert.ok(finalCase.sources.database.nodes.mycorrhizal_entry.options.some(
  option => option.goto === 'biosafety' && option.requires && option.requires.clueFound === 'MYCORRHIZAL_NETWORK'));
assert.ok(finalCase.sources.database.nodes.start.options.some(
  option => option.goto === 'mycorrhizal_entry' && option.requires && option.requires.clueFound === 'CHEMICAL_DISCONNECTION'));
assert.ok(finalCase.solutionChoice.options[2].requires.clueFound === 'DATABASE_PRECEDENT');

// Independent reachability report: every mood node and its valid path.
console.log('Campaign 2 mood-node reachability (state-explored, no whitelist):');
for (const m of report.moodNodes) {
  console.log('  ' + m.case + ' / ' + m.source + ' (' + m.speaker + ') .' + m.node +
    '  [' + m.personality + ', trips at mood ' + m.threshold + ']');
  console.log('      path: ' + m.path);
}
console.log(JSON.stringify({
  cases: report.cases,
  conversationSources: report.sources,
  moodNodesVerified: report.moodNodes.length,
  orphanedNodes: report.orphans,
  formalCluesReachable: report.formalCluesReachable,
  failures: 0
}, null, 2));
