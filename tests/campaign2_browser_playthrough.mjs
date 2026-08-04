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
new vm.Script(fs.readFileSync(path.join(root, 'campaign_2_data.js'), 'utf8') +
  '\n;globalThis.__C2__ = CAMPAIGN_2_DATA;').runInContext(dataContext);
const campaignData = JSON.parse(JSON.stringify(dataContext.__C2__));
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
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const handlers = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) handlers.reject(new Error(JSON.stringify(message.error)));
      else handlers.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') {
      exceptions.push(message.params.exceptionDetails.text);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://127.0.0.1:' + webPort + '/index.html' });

  for (let i = 0; i < 100; i++) {
    const ready = await send('Runtime.evaluate', {
      expression: 'document.readyState === "complete" && !!window.SSS',
      returnByValue: true
    });
    if (ready.result.value) break;
    await new Promise(resolve => setTimeout(resolve, 50));
  }

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
  await send('Page.reload');
  for (let i = 0; i < 100; i++) {
    const ready = await send('Runtime.evaluate', {
      expression: 'document.readyState === "complete" && !!window.SSS && !!document.getElementById("diagnose-btn")',
      returnByValue: true
    });
    if (ready.result.value) break;
    await new Promise(resolve => setTimeout(resolve, 50));
  }

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
  assert.equal(exceptions.length, 0, 'no uncaught browser exceptions');

  console.log(JSON.stringify({ browser: 'Google Chrome headless', cases: results, uncaughtExceptions: exceptions.length }, null, 2));
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
