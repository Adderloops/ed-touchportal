'use strict';

const fs = require('fs');
const path = require('path');
const { FLAGS, FLAGS2, GUI_FOCUS_NAMES, readBit } = require('../../definitions/flags');

/**
 * Lee Status.json (que Elite Dangerous reescribe constantemente) y lo
 * traduce a un objeto plano con todos los flags ya decodificados como
 * booleanos, listo para volcar a states de Touch Portal.
 *
 * Status.json puede pillarse "a medio escribir" si se lee justo cuando el
 * juego lo está reescribiendo -> los fallos de parseo se ignoran y se
 * reintenta en el siguiente ciclo (no se emite nada si falla).
 */
class StatusReader {
  /**
   * @param {string} journalFolder Carpeta "Saved Games/Frontier Developments/Elite Dangerous"
   * @param {number} pollIntervalMs
   */
  constructor(journalFolder, pollIntervalMs = 500) {
    this.statusPath = path.join(journalFolder, 'Status.json');
    this.pollIntervalMs = pollIntervalMs;
    this._timer = null;
    this._lastRaw = null;
  }

  /**
   * @param {(decoded: object) => void} onUpdate
   */
  start(onUpdate) {
    this.stop();
    this._timer = setInterval(() => {
      this._tick(onUpdate);
    }, this.pollIntervalMs);
    this._tick(onUpdate);
  }

  stop() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  _tick(onUpdate) {
    let raw;
    try {
      raw = fs.readFileSync(this.statusPath, 'utf8');
    } catch (err) {
      // El fichero puede no existir todavía (juego no arrancado)
      return;
    }

    if (raw === this._lastRaw) return; // sin cambios, no repetir trabajo
    this._lastRaw = raw;

    let status;
    try {
      status = JSON.parse(raw);
    } catch (err) {
      // Lectura a medias, se ignora este ciclo
      return;
    }

    onUpdate(StatusReader.decode(status));
  }

  /**
   * Convierte el Status.json crudo en un objeto con todos los flags ya
   * decodificados como booleanos con nombre, además de los campos "planos".
   */
  static decode(status) {
    const decoded = {
      raw: status,
      legalState: status.LegalState || 'Clean',
      fireGroup: status.FireGroup !== undefined ? String(status.FireGroup) : '0',
      guiFocus: GUI_FOCUS_NAMES[status.GuiFocus] || 'NoFocus',
      guiFocusRaw: status.GuiFocus,
      cargoMass: status.Cargo !== undefined ? String(status.Cargo) : '0',
      fuelMain: status.Fuel ? String(status.Fuel.FuelMain) : '0',
      fuelReservoir: status.Fuel ? String(status.Fuel.FuelReservoir) : '0',
      balance: status.Balance !== undefined ? String(status.Balance) : undefined,
      pipsSystems: undefined,
      pipsEngines: undefined,
      pipsWeapons: undefined,
      destinationName: status.Destination ? status.Destination.Name : '',
      destinationBody: status.Destination && status.Destination.Body !== undefined ? String(status.Destination.Body) : '',
      health: status.Health !== undefined ? String(status.Health) : undefined,
      oxygen: status.Oxygen !== undefined ? String(status.Oxygen) : undefined,
      temperature: status.Temperature !== undefined ? String(status.Temperature) : undefined,
      selectedWeapon: status.SelectedWeapon_Localised || status.SelectedWeapon || '',
      gravity: status.Gravity !== undefined ? String(status.Gravity) : undefined,
      legalStateBool: undefined,
    };

    if (Array.isArray(status.Pips) && status.Pips.length === 3) {
      decoded.pipsSystems = String(status.Pips[0]);
      decoded.pipsEngines = String(status.Pips[1]);
      decoded.pipsWeapons = String(status.Pips[2]);
    }

    for (const flag of FLAGS) {
      decoded[flag.id] = readBit(status.Flags, flag.bit) ? 'true' : 'false';
    }
    for (const flag of FLAGS2) {
      decoded[flag.id] = readBit(status.Flags2, flag.bit) ? 'true' : 'false';
    }

    return decoded;
  }
}

module.exports = StatusReader;
