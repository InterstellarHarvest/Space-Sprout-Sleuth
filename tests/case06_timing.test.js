const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const context = {};
vm.createContext(context);
const dataSource = fs.readFileSync('space_sprout_sleuth_data.js', 'utf8');
new vm.Script(dataSource + '\n;globalThis.__GAME_DATA__ = GAME_DATA;', {
  filename: 'space_sprout_sleuth_data.js'
}).runInContext(context);

const case06 = context.__GAME_DATA__.cases.find(candidate => candidate.id === 'alien1');
assert.ok(case06, 'runtime Case 06 (alien1) must exist');

const sensors = case06.sources.sensors.nodes;
const correlation = sensors.timing_match.text;
const dockingHours = Number(correlation.match(/Docking event timestamp:\s*([0-9.]+) hours ago/)[1]);
const lastSignalHours = Number(correlation.match(/Last network signal:\s*([0-9.]+) hours ago/)[1]);
const varianceHours = Number(correlation.match(/Variance:\s*([0-9.]+) hours/)[1]);
const differenceHours = Number((dockingHours - lastSignalHours).toFixed(1));

assert.ok(
  dockingHours > lastSignalHours,
  'when expressed as hours ago, docking must be earlier than the last network signal'
);
assert.equal(
  differenceHours,
  0.3,
  'the last network signal must occur 0.3 hours (18 minutes) after docking'
);
assert.equal(varianceHours, 0.3, 'the displayed variance must remain 0.3 hours');
assert.match(
  sensors.organism_status.text,
  /Last detected signal: 72\.1 hours ago/,
  'organism status must use the post-docking last-signal timestamp'
);
assert.ok(
  sensors.organism_status.options.some(option =>
    option.label === "72.1 hours \u2014 that's almost exactly when docking occurred."
  ),
  'the associated player choice must use the post-docking last-signal timestamp'
);
assert.match(
  sensors.docking_logs.text,
  /Timestamp: 72\.4 hours ago/,
  'the docking log must use the earlier docking timestamp'
);

console.log(JSON.stringify({
  assertions: 7,
  failures: 0,
  dockingHoursAgo: dockingHours,
  lastSignalHoursAgo: lastSignalHours,
  differenceHours,
  differenceMinutes: differenceHours * 60
}, null, 2));
