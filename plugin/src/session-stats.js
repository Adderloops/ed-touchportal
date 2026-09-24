'use strict';

/**
 * Contadores/acumuladores que solo viven mientras el plugin está en marcha
 * (se reinician al reiniciar Touch Portal o al usar la acción "Reiniciar
 * contadores de sesión"). No confundir con los states de Touch Portal:
 * este objeto es el almacén interno, los handlers vuelcan sus valores a
 * states cuando cambian.
 */
class SessionStats {
  constructor() {
    this.reset();
  }

  reset() {
    this.startedAt = new Date();
    this.activeMissionIds = new Set();
    this.combat = { bountyTotal: 0, deaths: 0 };
    this.trade = { profit: 0, miningCount: 0 };
    this.exploration = { scans: 0, dataSoldCredits: 0 };
    this.missions = { completed: 0, failed: 0 };
    this.powerplay = { meritsAtReset: null };
  }
}

module.exports = SessionStats;
