'use strict';

/**
 * Envoltorio sobre TPClient que:
 *  - evita reenviar un state si el valor no ha cambiado (Status.json se lee
 *    cada 500ms pero la mayoría de campos no cambian casi nunca -> ahorra
 *    tráfico al socket de Touch Portal).
 *  - permite "pulsar" un state a un valor durante X ms y luego volver al
 *    valor de reposo, para modelar eventos discretos del Journal (p.ej.
 *    "Fighter Destroyed") como cambios de state que disparan un Event en
 *    Touch Portal. Usa setTimeout (no bloqueante), a diferencia del
 *    Thread.sleep del plugin Java original que bloqueaba el hilo de eventos.
 */
class StateStore {
  constructor(tpClient) {
    this.tpClient = tpClient;
    this._values = new Map();
    this._pulseTimers = new Map();
  }

  /** Establece un valor solo si difiere del último enviado. */
  set(id, value) {
    const str = value === undefined || value === null ? '' : String(value);
    if (this._values.get(id) === str) return;
    this._values.set(id, str);
    this.tpClient.stateUpdate(id, str);
  }

  /** Establece varios valores de golpe (dedupe individual, un solo mensaje al socket). */
  setMany(pairs) {
    const toSend = [];
    for (const { id, value } of pairs) {
      const str = value === undefined || value === null ? '' : String(value);
      if (this._values.get(id) === str) continue;
      this._values.set(id, str);
      toSend.push({ id, value: str });
    }
    if (toSend.length > 0) {
      this.tpClient.stateUpdateMany(toSend);
    }
  }

  get(id) {
    return this._values.get(id);
  }

  /**
   * Pone `id` a `value` inmediatamente y, pasados `resetAfterMs`, lo vuelve
   * a poner a `resetValue`. Si se llama de nuevo antes de que expire, el
   * temporizador anterior se cancela (no se pisan pulsos).
   */
  pulse(id, value, resetValue = 'false', resetAfterMs = 800) {
    const existingTimer = this._pulseTimers.get(id);
    if (existingTimer) clearTimeout(existingTimer);

    // Fuerza el envío aunque el valor no haya cambiado respecto al último
    // (p.ej. dos "Fighter Destroyed" seguidos deben disparar el evento dos veces).
    this._values.delete(id);
    this.set(id, value);

    const timer = setTimeout(() => {
      this._pulseTimers.delete(id);
      this.set(id, resetValue);
    }, resetAfterMs);
    this._pulseTimers.set(id, timer);
  }
}

module.exports = StateStore;
