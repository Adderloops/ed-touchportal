'use strict';

/**
 * Suite de pruebas SIN necesitar Elite Dangerous instalado ni Touch Portal
 * corriendo. Valida:
 *  1) Decodificación de flags de Status.json (bitfields).
 *  2) Que los handlers de cada categoría reaccionan correctamente a un
 *     journal de ejemplo (test/sample-journal.ndjson), usando un TPClient
 *     falso que solo graba los valores enviados.
 *  3) Que JournalTailer sigue un fichero de journal real de forma
 *     incremental (no relee líneas ya procesadas) y detecta líneas nuevas.
 *
 * Ejecutar con: npm test
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const StatusReader = require('../src/services/status-reader');
const { JournalTailer } = require('../src/services/journal-tailer');
const StateStore = require('../src/services/state-store');
const EventRouter = require('../src/event-router');
const SessionStats = require('../src/session-stats');
const registerAllHandlers = require('../src/handlers');

const cmdrDefs = require('../definitions/category-cmdr');
const navDefs = require('../definitions/category-nav');
const combatDefs = require('../definitions/category-combat');
const tradeDefs = require('../definitions/category-trade');
const missionsDefs = require('../definitions/category-missions');
const powerDefs = require('../definitions/category-powerplay');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  OK  ${name}`);
    passed += 1;
  } catch (err) {
    console.error(`FALLO ${name}`);
    console.error(`      ${err.message}`);
    failed += 1;
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`  OK  ${name}`);
    passed += 1;
  } catch (err) {
    console.error(`FALLO ${name}`);
    console.error(`      ${err.message}`);
    failed += 1;
  }
}

// ---------------------------------------------------------------------
// 1) StatusReader.decode()
// ---------------------------------------------------------------------
console.log('\n[1] StatusReader.decode()');

test('decodifica isDocked, isLanded y areShieldsUp desde Flags', () => {
  // bit0=Docked, bit1=Landed(0), bit3=ShieldsUp
  const flags = (1 << 0) | (0 << 1) | (1 << 3);
  const decoded = StatusReader.decode({ Flags: flags, Flags2: 0, Pips: [4, 8, 4], Cargo: 12, Fuel: { FuelMain: 30, FuelReservoir: 0.5 }, LegalState: 'Clean', GuiFocus: 0, FireGroup: 0 });
  assert.strictEqual(decoded.isDocked, 'true');
  assert.strictEqual(decoded.isLanded, 'false');
  assert.strictEqual(decoded.areShieldsUp, 'true');
  assert.strictEqual(decoded.isSupercruise, 'false');
});

test('decodifica flags de Flags2 (on-foot)', () => {
  const flags2 = (1 << 0) | (1 << 6); // isOnFoot + isLowOxygen
  const decoded = StatusReader.decode({ Flags: 0, Flags2: flags2 });
  assert.strictEqual(decoded.isOnFoot, 'true');
  assert.strictEqual(decoded.isLowOxygen, 'true');
  assert.strictEqual(decoded.isInTaxi, 'false');
});

test('decodifica Pips y GuiFocus', () => {
  const decoded = StatusReader.decode({ Flags: 0, Flags2: 0, Pips: [2, 6, 8], GuiFocus: 6 });
  assert.strictEqual(decoded.pipsSystems, '2');
  assert.strictEqual(decoded.pipsEngines, '6');
  assert.strictEqual(decoded.pipsWeapons, '8');
  assert.strictEqual(decoded.guiFocus, 'GalaxyMap');
});

// ---------------------------------------------------------------------
// 2) Handlers contra un journal de ejemplo
// ---------------------------------------------------------------------
console.log('\n[2] Handlers de Journal (sample-journal.ndjson)');

function makeFakeTpClient() {
  const values = new Map();
  return {
    values,
    stateUpdate(id, value) {
      values.set(id, value);
    },
    stateUpdateMany(states) {
      for (const s of states) values.set(s.id, s.value);
    },
  };
}

const fakeTp = makeFakeTpClient();
const state = new StateStore(fakeTp);
const session = new SessionStats();
const router = new EventRouter();
registerAllHandlers(router, { state, session });

const journalPath = path.join(__dirname, 'sample-journal.ndjson');
const lines = fs.readFileSync(journalPath, 'utf8').split('\n').filter((l) => l.trim().length > 0);
for (const line of lines) {
  router.dispatch(JSON.parse(line));
}

test('Commander/LoadGame rellena nombre y nave', () => {
  assert.strictEqual(fakeTp.values.get(cmdrDefs.states.name.id), 'Adder');
  assert.strictEqual(fakeTp.values.get(cmdrDefs.states.shipType.id), 'Anaconda');
});

test('Rank traduce los índices numéricos a nombres de rango', () => {
  assert.strictEqual(fakeTp.values.get(cmdrDefs.states.combatRank.id), 'Master');
  assert.strictEqual(fakeTp.values.get(cmdrDefs.states.tradeRank.id), 'Dealer');
});

test('FSDJump actualiza el sistema actual de Navegación', () => {
  assert.strictEqual(fakeTp.values.get(navDefs.states.currentSystem.id), 'Sol');
  assert.strictEqual(String(fakeTp.values.get(navDefs.states.lastJumpDistance.id)), '8.59');
});

test('Interdicted + UnderAttack registran el nombre del atacante', () => {
  assert.strictEqual(fakeTp.values.get(combatDefs.states.lastInterdictorName.id), 'CMDR Villano');
});

test('Bounty acumula el total de recompensas de la sesión', () => {
  assert.strictEqual(String(fakeTp.values.get(combatDefs.states.sessionBountyTotal.id)), '15,000');
});

test('MarketBuy + MarketSell calculan el beneficio de la sesión (98000 - 95000)', () => {
  assert.strictEqual(String(fakeTp.values.get(tradeDefs.states.sessionProfit.id)), '3,000');
});

test('MissionAccepted + MissionCompleted actualizan contadores de misiones', () => {
  assert.strictEqual(String(fakeTp.values.get(missionsDefs.states.completedSession.id)), '1');
  assert.strictEqual(fakeTp.values.get(missionsDefs.states.lastCompleted.id), 'Courier mission');
});

test('PowerplayMerits + PowerplayRank (esquema Powerplay 2.0) actualizan el tracker', () => {
  assert.strictEqual(fakeTp.values.get(powerDefs.states.name.id), 'Yuri Grom');
  assert.strictEqual(String(fakeTp.values.get(powerDefs.states.totalMerits.id)), '15,420');
  assert.strictEqual(String(fakeTp.values.get(powerDefs.states.rank.id)), '4');
  assert.strictEqual(fakeTp.values.get(powerDefs.states.color.id), '#ef8435');
});

test('Died incrementa el contador de muertes de la sesión', () => {
  assert.strictEqual(String(fakeTp.values.get(combatDefs.states.deathsSession.id)), '1');
});

// ---------------------------------------------------------------------
// 3) JournalTailer: tailing incremental sobre un fichero real
// ---------------------------------------------------------------------
console.log('\n[3] JournalTailer (tailing incremental real)');

async function testJournalTailer() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ed-journal-test-'));
  const journalFile = path.join(tmpDir, 'Journal.2601010000.01.log');

  const line1 = JSON.stringify({ timestamp: '2026-01-01T00:00:00Z', event: 'Fileheader', part: 1 });
  fs.writeFileSync(journalFile, line1 + '\n');

  const tailer = new JournalTailer(tmpDir, 50);
  const received = [];
  tailer.on('event', (e) => received.push(e));

  tailer.start();
  await new Promise((r) => setTimeout(r, 200));

  assert.strictEqual(received.length, 1, `Debería haber leído 1 línea inicial, leyó ${received.length}`);
  assert.strictEqual(received[0].event, 'Fileheader');

  // Añadimos una línea nueva -> el tailer NO debe releer la primera
  const line2 = JSON.stringify({ timestamp: '2026-01-01T00:00:05Z', event: 'Commander', Name: 'Test' });
  fs.appendFileSync(journalFile, line2 + '\n');

  await new Promise((r) => setTimeout(r, 200));

  assert.strictEqual(received.length, 2, `Debería haber 2 líneas tras el append, hay ${received.length}`);
  assert.strictEqual(received[1].event, 'Commander');

  tailer.stop();
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

(async () => {
  await asyncTest('sigue un journal de forma incremental sin releer líneas antiguas', testJournalTailer);

  console.log(`\n${passed} pruebas OK, ${failed} fallidas.`);
  process.exit(failed > 0 ? 1 : 0);
})();
