'use strict';

const registerCmdr = require('./cmdr');
const registerNav = require('./nav');
const registerCombat = require('./combat');
const registerExploration = require('./exploration');
const registerTrade = require('./trade');
const registerPowerplay = require('./powerplay');
const registerMissions = require('./missions');
const registerStation = require('./station');
const registerOnFoot = require('./onfoot');
const registerCarrier = require('./carrier');
const registerSquadron = require('./squadron');

/**
 * Registra todos los handlers de categoría contra el EventRouter.
 * Añadir una categoría nueva = crear src/handlers/<categoria>.js con la
 * forma `module.exports = function(router, ctx) {...}` y añadirla aquí.
 */
function registerAllHandlers(router, ctx) {
  registerCmdr(router, ctx);
  registerNav(router, ctx);
  registerCombat(router, ctx);
  registerExploration(router, ctx);
  registerTrade(router, ctx);
  registerPowerplay(router, ctx);
  registerMissions(router, ctx);
  registerStation(router, ctx);
  registerOnFoot(router, ctx);
  registerCarrier(router, ctx);
  registerSquadron(router, ctx);
}

module.exports = registerAllHandlers;
