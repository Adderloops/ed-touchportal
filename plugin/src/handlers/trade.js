'use strict';

const defs = require('../../definitions/category-trade');
const { formatThousands } = require('../services/format');

module.exports = function registerTradeHandlers(router, ctx) {
  const { state, session } = ctx;

  router.on('MarketBuy', (e) => {
    session.trade.profit -= e.TotalCost || 0;
    state.setMany([
      { id: defs.states.lastCommodity.id, value: e.Type_Localised || e.Type },
      { id: defs.states.lastAction.id, value: 'Buy' },
      { id: defs.states.lastQty.id, value: e.Count },
      { id: defs.states.sessionProfit.id, value: formatThousands(session.trade.profit) },
    ]);
  });

  router.on('MarketSell', (e) => {
    session.trade.profit += e.TotalSale || 0;
    state.setMany([
      { id: defs.states.lastCommodity.id, value: e.Type_Localised || e.Type },
      { id: defs.states.lastAction.id, value: 'Sell' },
      { id: defs.states.lastQty.id, value: e.Count },
      { id: defs.states.sessionProfit.id, value: formatThousands(session.trade.profit) },
    ]);
  });

  router.on('MiningRefined', (e) => {
    session.trade.miningCount += 1;
    state.setMany([
      { id: defs.states.lastMiningMaterial.id, value: e.Type_Localised || e.Type },
      { id: defs.states.sessionMiningCount.id, value: session.trade.miningCount },
    ]);
  });

  router.on('CollectCargo', (e) => {
    state.set(defs.states.lastCargoCollected.id, e.Type_Localised || e.Type);
  });

  // El Rhino (y la recogida a pie) generan "MaterialCollected", no
  // "CollectCargo" (ese es el de los drones/limpets recogiendo en un
  // anillo de asteroides) - confirmado en vivo el 2026-09-04: 112 de
  // estos y 0 CollectCargo en la misma sesión de minería con el Rhino.
  router.on('MaterialCollected', (e) => {
    const raw = e.Name_Localised || e.Name || '';
    const label = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : '';
    if (label) state.set(defs.states.lastMaterialCollected.id, label);
  });

  // Capacidad máxima de la bodega del SRV activo, en toneladas. El Journal
  // (LaunchSRV) no trae este dato -- solo trae "SRVType" -- así que se usa
  // una tabla de valores confirmados a mano, nunca adivinados:
  //   - Rhino ("mev_rhino"): 72t, confirmado en vivo por el usuario
  //     (2026-09-06, bodega llena a 56/72 según su propia comprobación).
  //   - Scarab/Scorpion: sin confirmar todavía en este proyecto (la wiki da
  //     4t/2t respectivamente, pero no se ha verificado en el juego real de
  //     este usuario) -- se dejan fuera de la tabla a propósito para no
  //     mostrar un número no confirmado; el state se queda vacío si el
  //     SRVType no está en la tabla.
  const SRV_CARGO_CAPACITY_BY_TYPE = {
    mev_rhino: 72,
  };
  router.on('LaunchSRV', (e) => {
    const capacity = SRV_CARGO_CAPACITY_BY_TYPE[e.SRVType];
    state.set(defs.states.srvCargoCapacity.id, capacity !== undefined ? capacity : '');
  });
};
