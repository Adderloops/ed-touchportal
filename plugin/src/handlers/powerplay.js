'use strict';

const defs = require('../../definitions/category-powerplay');
const { getPowerplayColor, getMeritsToNextRank } = require('../services/powerplay-ranks');
const { formatThousands } = require('../services/format');

/**
 * A diferencia del proyecto ElitePowerPlayTracker original (que releía el
 * Journal entero cada 2s buscando "Powerplay"), aquí escuchamos los
 * eventos del Journal directamente según van llegando por el tailer
 * incremental: más ligero y sin límite de tamaño de journal.
 *
 * Se soportan tanto los eventos "clásicos" (Powerplay, al inicio de sesión)
 * como los añadidos en el relanzamiento de Powerplay 2.0 (PowerplayMerits,
 * PowerplayRank), que la librería Java de referencia todavía no tenía
 * registrados en su lista de eventos conocidos.
 */
module.exports = function registerPowerplayHandlers(router, ctx) {
  const { state, session } = ctx;

  function applyMerits(power, rank, totalMerits) {
    if (power !== undefined) {
      state.set(defs.states.name.id, power);
      state.set(defs.states.color.id, getPowerplayColor(power));
    }
    if (rank !== undefined) {
      state.set(defs.states.rank.id, rank);
      const next = getMeritsToNextRank(rank, totalMerits || 0);
      state.set(defs.states.nextRank.id, next.nextRank);
      state.set(defs.states.remainingMerits.id, formatThousands(next.remainingMerits === null ? 'MISSION_REQUIRED' : next.remainingMerits));
    }
    if (totalMerits !== undefined) {
      if (session.powerplay.meritsAtReset === null) session.powerplay.meritsAtReset = totalMerits;
      state.set(defs.states.totalMerits.id, formatThousands(totalMerits));
      state.set(defs.states.gainedMerits.id, formatThousands(totalMerits - session.powerplay.meritsAtReset));
    }
    state.set(defs.states.status.id, 'CONNECTED');
  }

  // Evento de arranque de sesión (schema "clásico")
  router.on('Powerplay', (e) => {
    applyMerits(e.Power, e.Rank, e.Merits);
  });

  // Eventos del relanzamiento Powerplay 2.0
  router.on('PowerplayMerits', (e) => {
    applyMerits(e.Power, undefined, e.TotalMerits !== undefined ? e.TotalMerits : e.Merits);
  });
  router.on('PowerplayRank', (e) => {
    const rank = e.Rank !== undefined ? e.Rank : e.NewRank !== undefined ? e.NewRank : e.NewRating;
    applyMerits(e.Power, rank, undefined);
  });

  router.on('PowerplayJoin', (e) => applyMerits(e.Power, 0, 0));
  router.on('PowerplayLeave', () => applyMerits('', 0, 0));
  router.on('PowerplayDefect', (e) => applyMerits(e.ToPower, 0, 0));

  router.on('PowerplayVoucher', (e) => {
    const amount = Array.isArray(e.Systems) ? e.Systems.length : e.Amount || 0;
    state.set(defs.states.lastVoucherAmount.id, formatThousands(amount));
  });
  router.on('PowerplaySalary', (e) => {
    if (e.Amount !== undefined) state.set(defs.states.lastVoucherAmount.id, formatThousands(e.Amount));
  });
};
