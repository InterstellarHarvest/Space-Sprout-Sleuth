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

// Plain option-edge reachability from 'start'. Mood is NOT modeled here — this
// is used only to detect structurally orphaned nodes in non-conversation
// (terminal/archive/action) sources, which carry no mood state.
function optionReachable(source) {
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

// --- Strict non-negative-mood clue reachability ----------------------------
// The former proof was a plain option-edge BFS that ignored mood entirely, so a
// clue reachable ONLY by first angering a source (accumulating negative
// moodShift) was still counted as "neutral". This models a concrete human
// player: it applies moodShift on first visit, applies setMood with the actual
// personality thresholds, tracks locked state, honors legitimate re-entry, and
// EXCLUDES any state whose runtime mood classification is 'annoyed' or 'angry'.
// A clue counts only if collected while the active source stays non-negative.
// Requirements are checked against case-global state (cluesFound/flags/
// nodesVisited/actions persist across sources and re-entries) grown to a
// fixpoint, so cross-source clue prerequisites resolve without node-name
// exemptions.
function requirementMet(req, mood, personality, G) {
  if (!req) return true;
  for (const key of Object.keys(req)) {
    const v = req[key];
    if (key === 'clueFound') { if (!G.clues.has(v)) return false; }
    else if (key === 'flagSet') { if (!G.flags.has(v)) return false; }
    else if (key === 'actionTaken') { if (!G.actions.has(v)) return false; }
    else if (key === 'nodeVisited') { if (!G.visited.has(v.split('.').pop())) return false; }
    else if (key === 'playerSpecies') { if (v !== 'human') return false; }   // model a human player
    else if (key === 'playerSpeciesNot') { if (v === 'human') return false; }
    else if (key === 'moodIsNot') { if (moodLabel(mood, personality) === v) return false; }
    else if (key === 'stateIs') { /* terminal state gate — treated as satisfiable */ }
  }
  return true;
}

function traverseConversationNeutral(source, G, paths) {
  const nodes = source.nodes, personality = source.personality;
  const moodNodeIds = Object.keys(nodes).filter(id => nodes[id].moodShift !== undefined);
  const bitOf = new Map(moodNodeIds.map((id, i) => [id, 1 << i]));
  const p = PERSONALITIES[personality] || PERSONALITIES.patient;
  // Apply arrival effects; return null if the resulting mood is negative.
  function arrive(id, moodBits, mood, locked, path) {
    const node = nodes[id]; const bit = bitOf.get(id) || 0;
    let m = mood, mb = moodBits, lk = locked;
    if (node.moodShift !== undefined && !(mb & bit)) { m += node.moodShift; mb |= bit; }
    if (node.setMood === 'neutral') m = 0;
    else if (node.setMood === 'annoyed') m = Math.min(m, -p.annoyThreshold);
    else if (node.setMood === 'angry') m = -(p.lockThreshold || 5);
    if (node.locksSource === true) lk = true;
    if (node.locksSource === false) lk = false;
    const label = moodLabel(m, personality);
    if (label === 'annoyed' || label === 'angry') return null;
    return { id, moodBits: mb, mood: m, locked: lk, path };
  }
  const seen = new Set();
  const first = arrive('start', 0, source.startMood || 0, false, []);
  if (!first) return;
  const queue = [first];
  while (queue.length) {
    const s = queue.shift();
    const key = s.id + '|' + s.moodBits + '|' + s.mood + '|' + (s.locked ? 1 : 0);
    if (seen.has(key)) continue; seen.add(key);
    const node = nodes[s.id];
    if (node.revealsClue) { G.next.clues.add(node.revealsClue); if (!paths[node.revealsClue]) paths[node.revealsClue] = s.path.concat('reveal@' + s.id); }
    if (node.setsFlag) G.next.flags.add(node.setsFlag);
    if (node.setsAction) G.next.actions.add(node.setsAction);
    G.next.visited.add(s.id);
    const options = node.options || [];
    const ends = node.endsConversation === true || options.length === 0;
    if (!ends) {
      for (const opt of options) {
        if (!nodes[opt.goto]) continue;
        if (!requirementMet(opt.requires, s.mood, personality, G)) continue;
        const nxt = arrive(opt.goto, s.moodBits, s.mood, s.locked, s.path.concat(opt.label));
        if (nxt) queue.push(nxt);
      }
    } else {
      // Legitimate re-entry: startNodeFor is 'start' because mood stays non-negative.
      const nxt = arrive(startNodeFor(source, s.mood, s.locked), s.moodBits, s.mood, s.locked, s.path.concat('↺'));
      if (nxt) queue.push(nxt);
    }
  }
}

function traverseOtherNeutral(source, G, paths) {
  // Non-conversation sources carry no mood; reachable == non-negative route.
  const nodes = source.nodes; const seen = new Set(); const queue = [{ id: 'start', path: [] }];
  while (queue.length) {
    const s = queue.shift();
    if (seen.has(s.id) || !nodes[s.id]) continue; seen.add(s.id);
    const node = nodes[s.id];
    if (node.revealsClue) { G.next.clues.add(node.revealsClue); if (!paths[node.revealsClue]) paths[node.revealsClue] = s.path.concat('reveal@' + s.id); }
    if (node.setsFlag) G.next.flags.add(node.setsFlag);
    if (node.setsAction) G.next.actions.add(node.setsAction);
    G.next.visited.add(s.id);
    for (const opt of node.options || []) queue.push({ id: opt.goto, path: s.path.concat(opt.label || opt.goto) });
  }
}

// Fixpoint over one case: returns { clues:Set of neutral-reachable tags, paths }.
function neutralClueReachability(caseData) {
  const G = { clues: new Set(), flags: new Set(), actions: new Set(), visited: new Set() };
  const paths = {};
  for (let iter = 0; iter < 16; iter++) {
    G.next = { clues: new Set(G.clues), flags: new Set(G.flags), actions: new Set(G.actions), visited: new Set(G.visited) };
    for (const source of Object.values(caseData.sources || {})) {
      if (source.type === 'conversation') traverseConversationNeutral(source, G, paths);
      else traverseOtherNeutral(source, G, paths);
    }
    const grew = G.next.clues.size > G.clues.size || G.next.flags.size > G.flags.size ||
      G.next.visited.size > G.visited.size || G.next.actions.size > G.actions.size;
    G.clues = G.next.clues; G.flags = G.next.flags; G.actions = G.next.actions; G.visited = G.next.visited;
    if (!grew) break;
  }
  return { clues: G.clues, paths };
}

const report = { cases: 0, sources: 0, moodNodes: [], orphans: 0, neutralCluePaths: [] };

for (const caseData of CAMPAIGN.cases) {
  report.cases++;
  const tags = new Set(caseData.clues.map(clue => clue.clueTag));

  for (const [sourceId, source] of Object.entries(caseData.sources)) {
    // Graph edges resolve and clue declarations are valid.
    for (const [nodeId, node] of Object.entries(source.nodes || {})) {
      for (const opt of node.options || []) {
        assert.ok(source.nodes[opt.goto], caseData.id + ':' + sourceId + '.' + nodeId + ' resolves goto ' + opt.goto);
        if (opt.requires && opt.requires.clueFound) assert.ok(tags.has(opt.requires.clueFound), 'clue dependency is declared');
      }
      if (node.revealsClue) assert.ok(tags.has(node.revealsClue), 'reveal references a formal clue');
    }

    if (source.type !== 'conversation') {
      // Non-mood sources (terminal/archive/action): every node must be reachable
      // through option edges — no whitelist. Mood is not modeled for these.
      const reach = optionReachable(source);
      for (const nodeId of Object.keys(source.nodes || {})) {
        if (!reach.has(nodeId)) {
          report.orphans++;
          assert.fail(caseData.id + ':' + sourceId + '.' + nodeId + ' is orphaned (unreachable via option edges)');
        }
      }
      continue;
    }
    report.sources++;

    // FULL unrestricted state simulation (mood routing + re-entry) — proves
    // every authored node and all 12 annoyed/locked mood nodes are reachable.
    const { reachable, firstPathTo } = exploreSource(source);

    for (const nodeId of Object.keys(source.nodes)) {
      if (!reachable.has(nodeId)) {
        report.orphans++;
        assert.fail(caseData.id + ':' + sourceId + '.' + nodeId +
          ' is orphaned — unreachable through authored choices, mood routing, and re-entry');
      }
    }

    for (const moodId of ['annoyed', 'locked']) {
      if (!source.nodes[moodId]) continue;
      assert.ok(reachable.has(moodId),
        caseData.id + ':' + sourceId + '.' + moodId + ' mood node must be reachable via state changes');
      const p = PERSONALITIES[source.personality];
      const threshold = moodId === 'locked' ? -(p.lockThreshold) : -(p.annoyThreshold);
      if (moodId === 'locked') {
        assert.notEqual(p.lockThreshold, null,
          caseData.id + ':' + sourceId + ' has a locked node but a non-locking personality');
      }
      report.moodNodes.push({
        case: caseData.id, source: sourceId, speaker: source.speaker, node: moodId,
        personality: source.personality, threshold, path: firstPathTo.get(moodId).join(' → ')
      });
    }
  }

  // STRICT non-negative-mood proof: every formal clue is collectable on a route
  // whose active-source mood classification never becomes annoyed or angry.
  const neutral = neutralClueReachability(caseData);
  for (const clue of caseData.clues) {
    assert.ok(neutral.clues.has(clue.clueTag),
      caseData.id + ' clue ' + clue.clueTag + ' (source ' + clue.action +
      ') is NOT collectable on any non-negative-mood route');
    report.neutralCluePaths.push({
      case: caseData.id, clue: clue.clueTag, source: clue.action,
      path: (neutral.paths[clue.clueTag] || []).join(' → ')
    });
  }
  assert.deepEqual([...neutral.clues].filter(t => tags.has(t)).sort(), [...tags].sort(),
    caseData.id + ' exposes every formal clue on a non-negative-mood path');
}

// Exactly the 12 authored mood nodes are configured and all are verified.
assert.equal(report.moodNodes.length, 12,
  'exactly 12 configured annoyed/locked mood nodes verified reachable, found ' + report.moodNodes.length);
// Exactly 30 formal clues, each proven neutral-reachable.
assert.equal(report.neutralCluePaths.length, 30,
  'exactly 30 formal clues proven neutral-reachable, found ' + report.neutralCluePaths.length);

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
// Independent proof: every formal clue on a non-negative-mood route.
console.log('\nCampaign 2 non-negative-mood clue reachability (state-aware):');
for (const c of report.neutralCluePaths) {
  console.log('  ' + c.case + ' / ' + c.clue + ' [' + c.source + ']');
  console.log('      neutral path: ' + c.path);
}
console.log(JSON.stringify({
  cases: report.cases,
  conversationSources: report.sources,
  moodNodesVerified: report.moodNodes.length,
  orphanedNodes: report.orphans,
  formalCluesNeutralReachable: report.neutralCluePaths.length,
  failures: 0
}, null, 2));
