'use strict';

/**
 * Definición declarativa de los flags booleanos que vienen en Status.json.
 * Cada entrada genera automáticamente: un state de Touch Portal, un event
 * "When X changes" y la lógica de lectura del bit correspondiente.
 *
 * Referencia oficial de bits (Journal manual de Frontier):
 * https://elite-journal.readthedocs.io/en/latest/Status%20File/
 */

// Flags (bitfield principal, 32 bits)
const FLAGS = [
  { bit: 0, id: 'isDocked', desc: 'Docked' },
  { bit: 1, id: 'isLanded', desc: 'Landed on a surface' },
  { bit: 2, id: 'isLandingGearDown', desc: 'Landing gear down' },
  { bit: 3, id: 'areShieldsUp', desc: 'Shields up' },
  { bit: 4, id: 'isSupercruise', desc: 'In supercruise' },
  { bit: 5, id: 'isFlightAssistOff', desc: 'Flight Assist off' },
  { bit: 6, id: 'areHardpointsDeployed', desc: 'Hardpoints deployed' },
  { bit: 7, id: 'isInWing', desc: 'In a Wing' },
  { bit: 8, id: 'areLightsOn', desc: 'Lights on' },
  { bit: 9, id: 'isCargoScoopDeployed', desc: 'Cargo scoop deployed' },
  { bit: 10, id: 'isSilentRunning', desc: 'Silent Running on' },
  { bit: 11, id: 'isScoopingFuel', desc: 'Scooping fuel' },
  { bit: 12, id: 'isSRVHandbrake', desc: 'SRV handbrake on' },
  { bit: 13, id: 'isSRVUsingTurretView', desc: 'SRV using turret view' },
  { bit: 14, id: 'isSRVTurretRetracted', desc: 'SRV turret retracted' },
  { bit: 15, id: 'isSRVDriveAssist', desc: 'SRV Drive Assist on' },
  { bit: 16, id: 'isFSDMassLocked', desc: 'FSD mass locked' },
  { bit: 17, id: 'isFSDCharging', desc: 'FSD charging' },
  { bit: 18, id: 'isFSDCooldown', desc: 'FSD cooldown' },
  { bit: 19, id: 'isLowFuel', desc: 'Low fuel (<25%)' },
  { bit: 20, id: 'isOverHeating', desc: 'Overheating (>100%)' },
  { bit: 21, id: 'hasLatLong', desc: 'Has valid surface coordinates' },
  { bit: 22, id: 'isInDanger', desc: 'In danger' },
  { bit: 23, id: 'isBeingInterdicted', desc: 'Being interdicted' },
  { bit: 24, id: 'isInMainShip', desc: 'In main ship' },
  { bit: 25, id: 'isInFighter', desc: 'In fighter' },
  { bit: 26, id: 'isInSRV', desc: 'In SRV' },
  { bit: 27, id: 'isHUDInAnalysisMode', desc: 'HUD in Analysis mode' },
  { bit: 28, id: 'isNightVision', desc: 'Night vision on' },
  { bit: 29, id: 'isAltitudeFromAverageRadius', desc: 'Altitude from average radius' },
  { bit: 30, id: 'isFSDJump', desc: 'FSD jump (hyperspace)' },
  { bit: 31, id: 'isSRVHighBeam', desc: 'SRV high beam on' },
];

// Flags2 (bitfield adicional, on-foot / multitripulación / entorno)
const FLAGS2 = [
  { bit: 0, id: 'isOnFoot', desc: 'On foot' },
  { bit: 1, id: 'isInTaxi', desc: 'In taxi (Apex)' },
  { bit: 2, id: 'isInMulticrew', desc: 'In multicrew session' },
  { bit: 3, id: 'isOnFootInStation', desc: 'On foot in station' },
  { bit: 4, id: 'isOnFootOnPlanet', desc: 'On foot on planet' },
  { bit: 5, id: 'isAimDownSight', desc: 'Aiming down sight' },
  { bit: 6, id: 'isLowOxygen', desc: 'Low oxygen' },
  { bit: 7, id: 'isLowHealth', desc: 'Low health' },
  { bit: 8, id: 'isCold', desc: 'Cold' },
  { bit: 9, id: 'isHot', desc: 'Hot' },
  { bit: 10, id: 'isVeryCold', desc: 'Very cold' },
  { bit: 11, id: 'isVeryHot', desc: 'Very hot' },
  { bit: 12, id: 'isGlideMode', desc: 'Glide mode' },
  { bit: 13, id: 'isOnFootInHangar', desc: 'On foot in hangar' },
  { bit: 14, id: 'isOnFootSocialSpace', desc: 'On foot in social space' },
  { bit: 15, id: 'isOnFootExterior', desc: 'On foot outside' },
  { bit: 16, id: 'isBreathableAtmosphere', desc: 'Breathable atmosphere' },
  { bit: 17, id: 'isTelepresenceMulticrew', desc: 'Telepresence multicrew' },
  { bit: 18, id: 'isPhysicalMulticrew', desc: 'Physical multicrew (on board)' },
  { bit: 19, id: 'isFsdHyperdriveCharging', desc: 'FSD hyperdrive charging (new)' },
];

// Nombres de GuiFocus (numérico -> texto), tal como Status.json los reporta
const GUI_FOCUS_NAMES = {
  0: 'NoFocus',
  1: 'InternalPanel',
  2: 'ExternalPanel',
  3: 'CommsPanel',
  4: 'RolePanel',
  5: 'StationServices',
  6: 'GalaxyMap',
  7: 'SystemMap',
  8: 'Orrery',
  9: 'FSS mode',
  10: 'SAA mode',
  11: 'Codex',
};

function readBit(bitfield, bit) {
  if (typeof bitfield !== 'number') return false;
  // eslint-disable-next-line no-bitwise
  return ((bitfield >> bit) & 1) === 1;
}

module.exports = { FLAGS, FLAGS2, GUI_FOCUS_NAMES, readBit };
