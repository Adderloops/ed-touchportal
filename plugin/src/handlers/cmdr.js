'use strict';

const defs = require('../../definitions/category-cmdr');
const tradeDefs = require('../../definitions/category-trade');
const shipDefs = require('../../definitions/category-ship');
const { rankName, COMBAT_RANKS, TRADE_RANKS, EXPLORATION_RANKS, CQC_RANKS, FEDERATION_RANKS, EMPIRE_RANKS } = require('../../definitions/ranks');
const { buildLoadoutColumns } = require('../services/module-names');
const { formatThousands } = require('../services/format');

/**
 * Datos del Commander: nombre, rangos, reputación, nave actual.
 * "credits" es SOLO una aproximación: se sincroniza al cargar partida
 * (LoadGame) y se ajusta con las transacciones más comunes del Journal,
 * pero el juego no emite un "saldo actual" en cada evento, así que puede
 * desincronizarse ligeramente (ver README).
 */
module.exports = function registerCmdrHandlers(router, ctx) {
  const { state } = ctx;

  // "credits" se muestra con puntos de millar (1.000 / 1.000.000 / etc.)
  // para que se lea de un vistazo. Touch Portal no puede formatear un
  // ${value:...} por su cuenta (ver el mismo caso con el "%" de
  // reputación, más abajo), así que el string con puntos se calcula aquí
  // y es lo que se manda como state -- pero eso significa que ya NO se
  // puede reconstruir el saldo real releyendo el state (state.get
  // devolvería "1.234.567", que Number() no puede parsear). Por eso se
  // guarda el saldo real en esta variable aparte (creditsRaw) y el string
  // con puntos se genera solo al enviar.
  let creditsRaw = 0;


  const setCredits = (amount) => {
    creditsRaw = amount;
    state.set(defs.states.credits.id, formatThousands(creditsRaw));
  };

  router.on('Commander', (e) => {
    state.set(defs.states.name.id, e.Name);
  });

  router.on('LoadGame', (e) => {
    if (e.Commander) state.set(defs.states.name.id, e.Commander);
    if (e.Credits !== undefined) setCredits(e.Credits);
    if (e.Ship) state.set(defs.states.shipType.id, e.Ship);
    if (e.ShipName) state.set(defs.states.shipName.id, e.ShipName);
    if (e.ShipIdent) state.set(defs.states.shipIdent.id, e.ShipIdent);
  });

  router.on('Rank', (e) => {
    state.setMany([
      { id: defs.states.combatRank.id, value: rankName(COMBAT_RANKS, e.Combat) },
      { id: defs.states.tradeRank.id, value: rankName(TRADE_RANKS, e.Trade) },
      { id: defs.states.exploRank.id, value: rankName(EXPLORATION_RANKS, e.Explore) },
      { id: defs.states.cqcRank.id, value: rankName(CQC_RANKS, e.CQC) },
      { id: defs.states.federationRank.id, value: rankName(FEDERATION_RANKS, e.Federation) },
      { id: defs.states.empireRank.id, value: rankName(EMPIRE_RANKS, e.Empire) },
    ]);
  });

  // El Journal manda la reputación como float con decimales (p.ej.
  // 82.457565) en el rango -100..100 -- se redondea a entero aquí porque
  // Touch Portal no puede formatear/redondear un ${value:...} por su
  // cuenta, solo sustituye el texto tal cual llega (el "%" final se añade
  // en el propio botón de la página, en el .tml).
  const pct = (n) => (typeof n === 'number' ? Math.round(n) : n);
  router.on('Reputation', (e) => {
    state.setMany([
      { id: defs.states.reputationFederation.id, value: pct(e.Federation) },
      { id: defs.states.reputationEmpire.id, value: pct(e.Empire) },
      { id: defs.states.reputationAlliance.id, value: pct(e.Alliance) },
      { id: defs.states.reputationIndependent.id, value: pct(e.Independent) },
    ]);
  });

  router.on('Loadout', (e) => {
    state.setMany([
      { id: defs.states.shipType.id, value: e.Ship },
      { id: defs.states.shipName.id, value: e.ShipName },
      { id: defs.states.shipIdent.id, value: e.ShipIdent },
      { id: defs.states.fuelCapacityMain.id, value: e.FuelCapacity ? e.FuelCapacity.Main : undefined },
      { id: defs.states.fuelCapacityReserve.id, value: e.FuelCapacity ? e.FuelCapacity.Reserve : undefined },
      // "CargoCapacity" (toneladas máximas de la bodega) solo llega en este
      // evento -- se guarda como state propio para poder calcular el % de
      // ocupación cuando cambie ed.trade.shipCargoCount (ver plugin.js).
      { id: tradeDefs.states.shipCargoCapacity.id, value: e.CargoCapacity },
    ]);

    // Página "ED - Loadout" (2026-09-17, rediseño v3 tarjetas 2026-09-18,
    // rediseño v4 lista única 2026-09-18 misma tarde): el mismo evento
    // Loadout trae el array completo "Modules" -- se clasifica por Slot y
    // se decodifica cada "Item" a texto legible (ver
    // src/services/module-names.js), una sola vez por Loadout.
    //
    // v4: el usuario pidió UNA sola página en vez de 4, estilo lista densa
    // tipo Coriolis/Edsy (icono de tuerca + grado pequeño junto al nombre)
    // -- vuelve a ser una lista de texto por categoría (como el v1/v2), no
    // un slot+color por módulo. Los 76 states por-módulo de v3
    // (`ed.ship.loadout<Slot>[Eng]`, ver MODULE_SLOTS en
    // definitions/category-ship.js) se quedan definidos pero sin usar --
    // no hace falta tocar entry.tp para este cambio.
    if (Array.isArray(e.Modules)) {
      const cols = buildLoadoutColumns(e.Modules);
      state.setMany([
        { id: shipDefs.states.loadoutHardpoints.id, value: cols.hardpoints },
        { id: shipDefs.states.loadoutUtility.id, value: cols.utility },
        { id: shipDefs.states.loadoutCoreInternals.id, value: cols.core },
        { id: shipDefs.states.loadoutOptionalInternals.id, value: cols.optional },
      ]);
    }

    // Panel de estadísticas al pie de "ED - Loadout" (v5, ronda 3,
    // 2026-09-18): SOLO campos que el propio evento Loadout manda
    // directamente -- el usuario, preguntado explícitamente, prefirió
    // esto a intentar reproducir los cálculos de Coriolis (velocidad,
    // DPS, resistencias de escudo/blindaje), que el juego no expone.
    // "Masa cargada" es la única cifra derivada, y es una suma directa
    // de campos ya reales del propio evento (sin masa/mecha física
    // inventada): UnladenMass + combustible máximo (principal+reserva) +
    // capacidad de bodega máxima.
    const statUpdates = [];
    if (typeof e.UnladenMass === 'number') {
      const unladen = Math.round(e.UnladenMass);
      const fuelMax = (e.FuelCapacity ? (e.FuelCapacity.Main || 0) + (e.FuelCapacity.Reserve || 0) : 0);
      const cargoMax = typeof e.CargoCapacity === 'number' ? e.CargoCapacity : 0;
      const laden = Math.round(e.UnladenMass + fuelMax + cargoMax);
      statUpdates.push({ id: shipDefs.states.loadoutMass.id, value: `${unladen} / ${laden} t` });
    }
    if (typeof e.MaxJumpRange === 'number') {
      statUpdates.push({ id: shipDefs.states.loadoutJumpRangeMax.id, value: `${e.MaxJumpRange.toFixed(1)} ly` });
    }
    if (typeof e.HullValue === 'number' || typeof e.ModulesValue === 'number') {
      const total = (e.HullValue || 0) + (e.ModulesValue || 0);
      statUpdates.push({ id: shipDefs.states.loadoutShipValue.id, value: `${formatThousands(total)} cr` });
    }
    if (typeof e.Rebuy === 'number') {
      statUpdates.push({ id: shipDefs.states.loadoutInsurance.id, value: `${formatThousands(e.Rebuy)} cr` });
    }
    if (statUpdates.length) state.setMany(statUpdates);
  });

  // Ajustes best-effort del saldo de créditos con las transacciones más comunes.
  const addCredits = (amount) => {
    if (!amount) return;
    setCredits(creditsRaw + amount);
  };
  router.on('MarketSell', (e) => addCredits(e.TotalSale));
  router.on('MarketBuy', (e) => addCredits(-(e.TotalCost || 0)));
  router.on('PayFines', (e) => addCredits(-(e.Amount || 0)));
  router.on('PayBounties', (e) => addCredits(-(e.Amount || 0)));
  router.on('RedeemVoucher', (e) => addCredits(e.Amount));
  router.on('MissionCompleted', (e) => addCredits(e.Reward));
  router.on('SellExplorationData', (e) => addCredits(e.TotalEarnings));
  router.on('MultiSellExplorationData', (e) => addCredits(e.TotalEarnings));

  // "ModuleInfo" se escribe cuando el juego actualiza ModulesInfo.json.
  // Comprobado en vivo el 2026-09-07: aparece unos segundos antes de que sea
  // posible transferir carga del SRV a la nave (o sea, cuando la nave recién
  // invocada con Recall Ship ya está alcanzable) -- 3 de 3 veces que se pudo
  // verificar con una CargoTransfer justo después. Un Dismiss Ship probado
  // en las mismas condiciones NO generó este evento (ni ningún otro cambio
  // de Journal/Status.json), así que solo sirve como señal de "lejos -> cerca";
  // el sentido contrario se infiere en src/actions.js a partir de la propia
  // pulsación del botón, no hay forma de confirmarlo con datos reales.
  router.on('ModuleInfo', () => {
    state.set(shipDefs.states.shipRecallLabel.id, 'DISMISS\nSHIP');
  });
};
