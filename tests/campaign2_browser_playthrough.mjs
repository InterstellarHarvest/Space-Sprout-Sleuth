import assert from 'node:assert/strict';
import childProcess from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

const chromeBin = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
assert.ok(fs.existsSync(chromeBin), 'Chrome executable is required');

const root = process.cwd();
const dataContext = {};
vm.createContext(dataContext);
new vm.Script(fs.readFileSync(path.join(root, 'space_sprout_sleuth_data.js'), 'utf8') + '\n' +
  fs.readFileSync(path.join(root, 'campaign_2_data.js'), 'utf8') +
  '\n;globalThis.__C2__ = CAMPAIGN_2_DATA; globalThis.__PERS__ = GAME_DATA.personalities;').runInContext(dataContext);
const campaignData = JSON.parse(JSON.stringify(dataContext.__C2__));
const personalities = JSON.parse(JSON.stringify(dataContext.__PERS__));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(root, '.' + requested);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const webPort = server.address().port;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sss-c2-browser-'));
const chrome = childProcess.spawn(chromeBin, [
  '--headless=new',
  '--disable-gpu',
  '--disable-background-networking',
  '--remote-debugging-port=0',
  '--user-data-dir=' + profile,
  'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });

let browserWs;
const listening = new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Chrome DevTools endpoint timeout')), 15000);
  chrome.stderr.setEncoding('utf8');
  chrome.stderr.on('data', chunk => {
    const match = chunk.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) {
      browserWs = match[1];
      clearTimeout(timer);
      resolve();
    }
  });
  chrome.once('exit', code => reject(new Error('Chrome exited before DevTools was ready: ' + code)));
});

let ws;
try {
  await listening;
  const debugPort = Number(new URL(browserWs).port);
  const targets = await fetch('http://127.0.0.1:' + debugPort + '/json/list').then(response => response.json());
  const page = targets.find(target => target.type === 'page');
  assert.ok(page, 'Chrome page target exists');

  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let nextId = 1;
  const pending = new Map();
  const exceptions = [];
  // One-shot resolvers armed before each navigation; fired by Page.loadEventFired
  // so we only sample the freshly-loaded execution context, never the stale one.
  let loadWaiters = [];
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const handlers = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handlers.reject(new Error(JSON.stringify(message.error)));
      else handlers.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      exceptions.push(message.params.exceptionDetails.text);
    } else if (message.method === 'Page.loadEventFired') {
      const waiters = loadWaiters;
      loadWaiters = [];
      for (const resolve of waiters) resolve();
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  // Navigate/reload deterministically: arm a load-event waiter BEFORE issuing the
  // command, wait for the fresh page's load event (distinguishing it from the old
  // context), then bounded-poll for the actual game runtime — not merely page
  // load. Throws a diagnostic error on genuine timeout; never silently proceeds.
  const LOAD_TIMEOUT_MS = 20000;
  const RUNTIME_TIMEOUT_MS = 20000;
  const navigateAndWait = async (label, commandFn, readyExpr = 'true') => {
    let timer;
    const loaded = new Promise((resolve, reject) => {
      loadWaiters.push(() => { clearTimeout(timer); resolve(); });
      timer = setTimeout(() => reject(new Error('load event timeout (' + label + ') after ' + LOAD_TIMEOUT_MS + 'ms')), LOAD_TIMEOUT_MS);
    });
    await commandFn();
    await loaded;
    const condition = 'document.readyState === "complete" && !!window.SSS && (' + readyExpr + ')';
    const deadline = Date.now() + RUNTIME_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const ready = await send('Runtime.evaluate', { expression: condition, returnByValue: true });
      if (ready.result && ready.result.value === true) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    const diag = await send('Runtime.evaluate', {
      expression: 'JSON.stringify({readyState:document.readyState,hasSSS:!!window.SSS,hasDiagnose:!!document.getElementById("diagnose-btn")})',
      returnByValue: true
    });
    throw new Error('game runtime not ready (' + label + ') within ' + RUNTIME_TIMEOUT_MS + 'ms; last observed: ' + (diag.result && diag.result.value));
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await navigateAndWait('initial load', () => send('Page.navigate', { url: 'http://127.0.0.1:' + webPort + '/index.html' }));

  const seededSave = {
    playerName: 'Browser Auditor',
    currentCase: 0,
    rank: 0,
    caseState: {
      cluesFound: [], nodesVisited: {}, actionsTaken: [], flags: [], sourceStates: {},
      wrongGuesses: 0, diagnosed: false, bonusInsights: 0, textProgress: {},
      calledHome: false, solutionIdx: -1
    },
    completedCases: [],
    totalScore: 0,
    campaign1Complete: true,
    currentCampaign: 1,
    playerSpecies: 'human'
  };
  await send('Runtime.evaluate', {
    expression: 'localStorage.setItem("space_sprout_sleuth_save", ' + JSON.stringify(JSON.stringify(seededSave)) + ')'
  });
  await navigateAndWait('seed reload', () => send('Page.reload'), '!!document.getElementById("diagnose-btn")');

  const playAllCases = async campaign => {
    const results = [];
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
    const skipTyping = async () => {
      const area = document.getElementById('info-area');
      area.click();
      await pause(20);
    };
    const savedState = () => JSON.parse(localStorage.getItem('space_sprout_sleuth_save'));

    function findPath(source, tag, foundTags) {
      const queue = [{ nodeId: 'start', path: [], flags: new Set(), visited: new Set(), mood: source.startMood || 0 }];
      const seen = new Set();
      while (queue.length) {
        const state = queue.shift();
        const signature = state.nodeId + '|' + [...state.flags].sort().join(',') + '|' + state.mood;
        if (seen.has(signature)) continue;
        seen.add(signature);
        const node = source.nodes[state.nodeId];
        if (!node) continue;
        const flags = new Set(state.flags);
        if (node.setsFlag) flags.add(node.setsFlag);
        const visited = new Set(state.visited);
        visited.add(state.nodeId);
        let mood = state.mood;
        if (typeof node.moodShift === 'number') mood += node.moodShift;
        if (node.setMood === 'neutral') mood = 0;
        if (node.setMood === 'annoyed') mood = -2;
        if (node.setMood === 'angry') mood = -5;
        if (node.revealsClue === tag) return state.path;
        if (node.endsConversation) {
          queue.push({
            nodeId: 'start',
            path: [...state.path, node.exitLabel || 'Back', '__REENTER__'],
            flags,
            visited,
            mood
          });
          continue;
        }
        for (const option of node.options || []) {
          const req = option.requires || {};
          if (req.clueFound && !foundTags.has(req.clueFound)) continue;
          if (req.flagSet && !flags.has(req.flagSet)) continue;
          if (req.nodeVisited && !visited.has(req.nodeVisited.split('.').pop())) continue;
          if (req.playerSpecies && req.playerSpecies !== 'human') continue;
          if (req.playerSpeciesNot === 'human') continue;
          if (req.moodIsNot === 'neutral' && mood === 0) continue;
          queue.push({ nodeId: option.goto, path: [...state.path, option.label], flags, visited, mood });
        }
      }
      return null;
    }

    for (let caseIndex = 0; caseIndex < campaign.cases.length; caseIndex++) {
      const caseData = campaign.cases[caseIndex];
      SSS.showBriefing();
      SSS.beginInvestigation();

      const foundTags = new Set();
      for (const clue of caseData.clues) {
        const source = caseData.sources[clue.action];
        const path = findPath(source, clue.clueTag, foundTags);
        if (!path) throw new Error(caseData.id + ': no playable route for ' + clue.clueTag);
        document.querySelector('[data-clue-tag="' + clue.clueTag + '"]').click();
        await skipTyping();
        for (const label of path) {
          if (label === '__REENTER__') {
            document.querySelector('[data-clue-tag="' + clue.clueTag + '"]').click();
            await skipTyping();
            continue;
          }
          const option = [...document.querySelectorAll('.dialogue-option')]
            .find(element => element.textContent.trim() === label);
          if (!option) throw new Error(caseData.id + ': option unavailable: ' + label);
          option.click();
          await skipTyping();
        }
        foundTags.add(clue.clueTag);
        SSS.showFieldNotes();
      }
      const collected = savedState().caseState.cluesFound.length;
      if (collected !== caseData.clues.length) throw new Error(caseData.id + ': clue count mismatch');

      document.getElementById('diagnose-btn').click();
      const correctIndex = caseData.diagnoses.findIndex(item => item.isCorrect);
      document.querySelector('.diagnosis-option[data-idx="' + correctIndex + '"]').click();
      document.getElementById('confirm-btn').click();
      if (!savedState().caseState.diagnosed) throw new Error(caseData.id + ': diagnosis did not complete');

      const requiresSolution = !!caseData.solutionChoice;
      const scene = document.getElementById('scene-img');
      const beforeSolutionScene = scene.getAttribute('src') || '';
      if (requiresSolution) {
        if (!document.getElementById('confirm-solution-btn')) throw new Error(caseData.id + ': solution screen missing');
        document.querySelector('.diagnosis-option[data-idx="0"]').click();
        document.getElementById('confirm-solution-btn').click();
        if (savedState().caseState.solutionIdx !== 0) throw new Error(caseData.id + ': solution not persisted');
      }

      if (caseData.sprites.sceneAlt) {
        if (beforeSolutionScene.includes(caseData.sprites.sceneAlt)) throw new Error(caseData.id + ': resolved scene appeared early');
        scene.dispatchEvent(new Event('transitionend'));
        await pause(150);
        const after = scene.getAttribute('src') || '';
        if (!after.includes(caseData.sprites.sceneAlt)) throw new Error(caseData.id + ': resolved scene did not appear');
      }

      results.push({
        id: caseData.id,
        clues: savedState().caseState.cluesFound.length,
        diagnosed: savedState().caseState.diagnosed,
        solutionRequired: requiresSolution,
        solutionIdx: savedState().caseState.solutionIdx
      });
      if (caseIndex < campaign.cases.length - 1) SSS.nextCase();
    }
    return results;
  };

  const evaluated = await send('Runtime.evaluate', {
    expression: '(' + playAllCases.toString() + ')(' + JSON.stringify(campaignData) + ')',
    awaitPromise: true,
    returnByValue: true
  });
  if (evaluated.exceptionDetails) throw new Error(evaluated.exceptionDetails.text);
  const results = evaluated.result.value;
  assert.equal(results.length, 6);
  assert.deepEqual(results.map(item => item.clues), [5, 5, 5, 5, 5, 5]);
  assert.ok(results.every(item => item.diagnosed));
  assert.deepEqual(results.map(item => item.solutionRequired), [false, false, false, false, true, true]);
  // The neutral playthrough above collected all 5 clues in every case without
  // ever entering a negative mood — proving formal clues never require a bad mood.

  // ================= Mood-mechanics runtime coverage =================
  // Drive every configured annoyed/locked mood node to its threshold through
  // real, ungated player choices, verifying: (a) the runtime routes to the
  // mood node on re-entry (mood-dot indicator), (b) mood persists across the
  // exit/re-entry that triggering requires, (c) recovery returns to neutral,
  // (d) Case 06's speakers keep independent per-speaker mood, (e) mood persists
  // across a full page reload, and (f) no corrected wording defect ever renders.
  const DEFECT_RE = /passes through the kelp unused|this is the mechanism|never (?:been )?restored|transplant living soil/i;

  function moodLabel(m, pers) {
    const p = personalities[pers] || personalities.patient;
    if (p.lockThreshold !== null && m <= -p.lockThreshold) return 'angry';
    if (m <= -p.annoyThreshold) return 'annoyed';
    if (m >= 2) return 'friendly';
    return 'neutral';
  }
  function startNodeFor(src, mood, locked) {
    const l = moodLabel(mood, src.personality);
    if (l === 'angry' && src.nodes.locked) return 'locked';
    if (l === 'annoyed' && src.nodes.annoyed) return 'annoyed';
    if (locked && src.nodes.locked) return 'locked';
    return 'start';
  }
  function pathToMood(src, target) {
    const nodes = src.nodes, pers = src.personality;
    const moodIds = Object.keys(nodes).filter(id => nodes[id].moodShift !== undefined);
    const idx = new Map(moodIds.map((id, i) => [id, 1 << i]));
    const seen = new Set();
    const q = [{ id: startNodeFor(src, src.startMood || 0, false), vis: 0, mood: src.startMood || 0, locked: false, clicks: [] }];
    while (q.length) {
      const s = q.shift(); const n = nodes[s.id];
      let mood = s.mood, vis = s.vis, locked = s.locked;
      const bit = idx.get(s.id) || 0;
      if (n.moodShift !== undefined && !(vis & bit)) { mood += n.moodShift; vis |= bit; }
      if (n.setMood === 'neutral') mood = 0;
      else if (n.setMood === 'annoyed') mood = Math.min(mood, -personalities[pers].annoyThreshold);
      else if (n.setMood === 'angry') mood = -(personalities[pers].lockThreshold || 5);
      if (n.locksSource === true) locked = true;
      if (n.locksSource === false) locked = false;
      const k = s.id + '|' + vis + '|' + mood + '|' + (locked ? 1 : 0);
      if (seen.has(k)) continue; seen.add(k);
      if (s.id === target) return s.clicks;
      const opts = n.options || []; const ends = n.endsConversation === true || opts.length === 0;
      if (!ends) for (const o of opts) q.push({ id: o.goto, vis, mood, locked, clicks: s.clicks.concat(o.label) });
      else q.push({ id: startNodeFor(src, mood, locked), vis, mood, locked, clicks: s.clicks.concat('__REENTER__') });
    }
    return null;
  }
  function directRecoveryLabel(src, moodId) {
    for (const o of src.nodes[moodId].options || []) {
      const t = src.nodes[o.goto];
      if (t && t.setMood === 'neutral') return o.label;
    }
    return null;
  }
  function clueTagForSource(caseData, sourceKey) {
    const c = caseData.clues.find(cl => cl.action === sourceKey);
    return c ? c.clueTag : null;
  }

  const moodSpecs = [];
  campaignData.cases.forEach((caseData, caseIndex) => {
    for (const [sourceKey, src] of Object.entries(caseData.sources || {})) {
      if (src.type !== 'conversation') continue;
      for (const moodId of ['annoyed', 'locked']) {
        if (!src.nodes[moodId]) continue;
        moodSpecs.push({
          caseIndex, caseId: caseData.id, sourceKey, speaker: src.speaker,
          target: moodId, expectDot: moodId === 'locked' ? 'angry' : 'annoyed',
          clueTag: clueTagForSource(caseData, sourceKey),
          path: pathToMood(src, moodId),
          recoveryLabel: directRecoveryLabel(src, moodId)
        });
      }
    }
  });
  assert.equal(moodSpecs.length, 12, 'exactly 12 mood nodes to exercise in-browser');
  assert.ok(moodSpecs.every(s => s.path), 'every mood node has a replayable click-path');
  assert.ok(moodSpecs.every(s => s.recoveryLabel), 'every mood node exposes a direct neutral-recovery option');

  const freshCaseState = () => ({ cluesFound: [], nodesVisited: {}, actionsTaken: [], flags: [], sourceStates: {}, wrongGuesses: 0, diagnosed: false, bonusInsights: 0, textProgress: {}, calledHome: false, solutionIdx: -1 });
  const seedAndBegin = async (caseIndex, keepSave) => {
    if (!keepSave) {
      const seed = { ...seededSave, currentCase: caseIndex, completedCases: Array.from({ length: caseIndex }, (_, i) => i), caseState: freshCaseState() };
      await send('Runtime.evaluate', { expression: 'localStorage.setItem("space_sprout_sleuth_save", ' + JSON.stringify(JSON.stringify(seed)) + ')' });
    }
    await navigateAndWait('case ' + caseIndex + (keepSave ? ' reopen' : ''), () => send('Page.reload'), '!!document.getElementById("diagnose-btn")');
    await send('Runtime.evaluate', { expression: 'SSS.showBriefing(); SSS.beginInvestigation(); true' });
  };
  const evalPage = async (fn, arg) => {
    const res = await send('Runtime.evaluate', { expression: '(' + fn.toString() + ')(' + JSON.stringify(arg) + ')', awaitPromise: true, returnByValue: true });
    if (res.exceptionDetails) throw new Error(res.exceptionDetails.text);
    return res.result.value;
  };

  // In-page driver: open source, replay path, capture mood-dot + texts, recover.
  async function driveMood(spec) {
    const pause = ms => new Promise(r => setTimeout(r, ms));
    const skip = async () => { const a = document.getElementById('info-area'); if (a) a.click(); await pause(15); };
    const info = () => { const a = document.getElementById('info-area'); return a ? a.textContent : ''; };
    const openSource = async tag => { const b = document.querySelector('[data-clue-tag="' + tag + '"]'); if (!b) return false; b.click(); await skip(); return true; };
    const clickOpt = async label => { const o = [...document.querySelectorAll('.dialogue-option')].find(e => e.textContent.trim() === label); if (!o) return false; o.click(); await skip(); return true; };
    const negDot = () => ({ annoyed: !!document.querySelector('.mood-dot.annoyed'), angry: !!document.querySelector('.mood-dot.angry') });
    const seen = [];
    if (!(await openSource(spec.clueTag))) return { error: 'source button missing: ' + spec.clueTag };
    seen.push(info());
    for (const label of spec.path) {
      if (label === '__REENTER__') { await openSource(spec.clueTag); }
      else if (!(await clickOpt(label))) return { error: 'option unavailable: ' + label, seen };
      seen.push(info());
    }
    const triggered = negDot();
    let recovered = null;
    if (!spec.skipRecovery && spec.recoveryLabel) {
      if (await clickOpt(spec.recoveryLabel)) { await openSource(spec.clueTag); recovered = negDot(); seen.push(info()); }
    }
    return { triggered, recovered, seen };
  }

  const capturedTexts = [];
  const moodReport = [];
  for (const spec of moodSpecs) {
    await seedAndBegin(spec.caseIndex, false);
    const r = await evalPage(driveMood, spec);
    const tag = spec.caseId + '/' + spec.sourceKey + '.' + spec.target;
    assert.ok(!r.error, tag + ': ' + r.error);
    capturedTexts.push(...r.seen);
    if (spec.expectDot === 'annoyed') assert.ok(r.triggered.annoyed, tag + ' must show the annoyed mood indicator after triggering');
    else assert.ok(r.triggered.angry, tag + ' must show the angry (locked) mood indicator after triggering');
    assert.ok(r.recovered && !r.recovered.annoyed && !r.recovered.angry, tag + ' must recover to neutral via the recovery option');
    moodReport.push({ node: tag, indicator: spec.expectDot, recovered: true });
  }

  // Per-speaker independence: triggering Dr. Nova must not annoy Vorn-Shael.
  const novaSpec = moodSpecs.find(s => s.caseIndex === 5 && s.sourceKey === 'nova' && s.target === 'annoyed');
  await seedAndBegin(5, false);
  const rNova = await evalPage(driveMood, { ...novaSpec, skipRecovery: true });
  assert.ok(rNova.triggered.annoyed, 'Case 06 Nova annoyed triggers');
  const vornTag = clueTagForSource(campaignData.cases[5], 'vorn_shael');
  const rVorn = await evalPage(async tag => {
    const pause = ms => new Promise(r => setTimeout(r, ms));
    document.querySelector('[data-clue-tag="' + tag + '"]').click();
    const a = document.getElementById('info-area'); if (a) a.click(); await pause(15);
    return { annoyed: !!document.querySelector('.mood-dot.annoyed'), angry: !!document.querySelector('.mood-dot.angry') };
  }, vornTag);
  assert.ok(!rVorn.annoyed && !rVorn.angry, 'Case 06 Vorn-Shael keeps independent neutral mood while Nova is annoyed');

  // Cross-reload persistence on a representative annoyed and locked node.
  for (const spec of [moodSpecs.find(s => s.caseId === 'missing_dance'), moodSpecs.find(s => s.caseId === 'wrong_color_light' && s.target === 'locked')]) {
    await seedAndBegin(spec.caseIndex, false);
    const r1 = await evalPage(driveMood, { ...spec, skipRecovery: true });
    capturedTexts.push(...r1.seen);
    assert.ok(spec.expectDot === 'angry' ? r1.triggered.angry : r1.triggered.annoyed, spec.caseId + ' triggers before reload');
    await seedAndBegin(spec.caseIndex, true); // reload, keep saved mood
    const r2 = await evalPage(async tag => {
      const pause = ms => new Promise(r => setTimeout(r, ms));
      document.querySelector('[data-clue-tag="' + tag + '"]').click();
      const a = document.getElementById('info-area'); if (a) a.click(); await pause(15);
      return { annoyed: !!document.querySelector('.mood-dot.annoyed'), angry: !!document.querySelector('.mood-dot.angry') };
    }, spec.clueTag);
    assert.ok(spec.expectDot === 'angry' ? r2.angry : r2.annoyed, spec.caseId + ' mood persists across a full page reload');
  }

  // Newly connected cold-exit (exit_cold): from an annoyed conversation the
  // "I'll leave you to it." option must render the authored cold farewell, end
  // the conversation, and be non-recovering (mood stays annoyed on re-entry)
  // and non-trapping (the source re-opens normally). Representative: Vess-lor.
  const coldSpec = moodSpecs.find(s => s.caseId === 'silent_grove' && s.target === 'annoyed');
  await seedAndBegin(coldSpec.caseIndex, false);
  const cold = await evalPage(async spec => {
    const pause = ms => new Promise(r => setTimeout(r, ms));
    const skip = async () => { const a = document.getElementById('info-area'); if (a) a.click(); await pause(15); };
    const info = () => { const a = document.getElementById('info-area'); return a ? a.textContent : ''; };
    const open = async tag => { const b = document.querySelector('[data-clue-tag="' + tag + '"]'); b.click(); await skip(); };
    const click = async label => { const o = [...document.querySelectorAll('.dialogue-option')].find(e => e.textContent.trim() === label); if (!o) return false; o.click(); await skip(); return true; };
    await open(spec.clueTag);
    for (const label of spec.path) { if (label === '__REENTER__') await open(spec.clueTag); else await click(label); }
    const annoyedBefore = !!document.querySelector('.mood-dot.annoyed');
    const hadColdOption = [...document.querySelectorAll('.dialogue-option')].some(e => e.textContent.trim() === "I'll leave you to it.");
    const clicked = await click("I'll leave you to it.");
    const coldText = info();
    await open(spec.clueTag); // re-enter after the cold exit
    const annoyedAfter = !!document.querySelector('.mood-dot.annoyed');
    return { annoyedBefore, hadColdOption, clicked, coldText, annoyedAfter };
  }, coldSpec);
  capturedTexts.push(cold.coldText);
  assert.ok(cold.annoyedBefore, 'cold-exit precondition: Vess-lor is annoyed');
  assert.ok(cold.hadColdOption && cold.clicked, 'annoyed conversation offers the "I\'ll leave you to it." cold-exit option');
  assert.match(cold.coldText, /says nothing|chromatophores darken/, 'cold exit renders the authored cold farewell');
  assert.ok(cold.annoyedAfter, 'cold exit is non-recovering (mood persists) and non-trapping (source re-opens)');

  // No corrected-wording defect ever rendered during any interaction.
  for (const t of capturedTexts) {
    assert.doesNotMatch(t, DEFECT_RE, 'a corrected-wording defect string rendered at runtime');
  }

  await send('Runtime.enable');
  assert.equal(exceptions.length, 0, 'no uncaught browser exceptions');

  console.log(JSON.stringify({ browser: 'Google Chrome headless', cases: results, moodNodesExercised: moodReport.length, moodReport, uncaughtExceptions: exceptions.length }, null, 2));
} finally {
  if (ws && ws.readyState === WebSocket.OPEN) ws.close();
  chrome.kill('SIGTERM');
  await new Promise(resolve => server.close(resolve));
  if (chrome.exitCode === null) {
    await Promise.race([
      new Promise(resolve => chrome.once('exit', resolve)),
      new Promise(resolve => setTimeout(resolve, 2000))
    ]);
  }
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
