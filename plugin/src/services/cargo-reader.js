'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Lee Cargo.json (que Elite Dangerous reescribe cada vez que cambia el
 * contenido de una bodega) y expone un resumen listo para Touch Portal:
 * vessel ("Ship"/"SRV"), total de unidades y una lista legible en una
 * sola línea ("Total 42: Deuterium x35, Vanadium x7...").
 *
 * A diferencia de Status.json, aquí solo hay UN fichero para las dos
 * bodegas: el juego lo reescribe con el contenido de la que esté activa
 * en cada momento (según el campo "Vessel"). Por eso este reader no
 * "decide" a qué bodega pertenece el cambio - solo informa de qué
 * vessel trae el fichero en cada tick. Quien reciba el callback
 * (`plugin.js`) es responsable de actualizar solo el state de esa
 * bodega concreta, dejando el de la otra tal cual estaba (su último
 * valor conocido sigue siendo válido mientras esa bodega no cambie).
 *
 * No confundir con el Journal: tras el primer evento "Cargo" de cada
 * fichero de Journal (con inventario completo), los siguientes solo son
 * un aviso vacío de "el fichero ha cambiado" (documentado en el manual
 * oficial del Journal) - por eso hace falta releer Cargo.json en sí,
 * igual que StatusReader hace con Status.json, en vez de fiarse del
 * Journal para esto.
 */
class CargoReader {
  /**
   * @param {string} journalFolder Carpeta "Saved Games/Frontier Developments/Elite Dangerous"
   * @param {number} pollIntervalMs
   */
  constructor(journalFolder, pollIntervalMs = 1000) {
    this.cargoPath = path.join(journalFolder, 'Cargo.json');
    this.pollIntervalMs = pollIntervalMs;
    this._timer = null;
    this._lastRaw = null;
  }

  /**
   * @param {(decoded: {vessel: string, count: string, list: string}) => void} onUpdate
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
      raw = fs.readFileSync(this.cargoPath, 'utf8');
    } catch (err) {
      // El fichero puede no existir todavía (juego no arrancado)
      return;
    }

    if (raw === this._lastRaw) return; // sin cambios, no repetir trabajo
    this._lastRaw = raw;

    let cargo;
    try {
      cargo = JSON.parse(raw);
    } catch (err) {
      // Lectura a medias (el juego lo está reescribiendo), se ignora este ciclo
      return;
    }

    onUpdate(CargoReader.decode(cargo));
  }

  /**
   * Convierte el Cargo.json crudo en {vessel, count, list} listo para
   * volcar a un state de texto de Touch Portal.
   */
  static decode(cargo) {
    const inventory = Array.isArray(cargo.Inventory) ? cargo.Inventory : [];
    const sorted = [...inventory].sort((a, b) => (b.Count || 0) - (a.Count || 0));

    const totalCount = cargo.Count !== undefined
      ? cargo.Count
      : sorted.reduce((sum, item) => sum + (item.Count || 0), 0);

    const items = sorted
      .map((item) => {
        const raw = item.Name_Localised || item.Name || '?';
        const label = raw.charAt(0).toUpperCase() + raw.slice(1);
        return `${label} x${item.Count}`;
      })
      .join(', ');

    return {
      vessel: cargo.Vessel === 'SRV' ? 'SRV' : 'Ship',
      count: String(totalCount),
      list: items ? `Total ${totalCount}: ${items}` : 'Hold empty',
    };
  }
}

module.exports = CargoReader;
