'use strict';

/**
 * Enruta cada línea de Journal ya parseada (objeto JSON con campo "event")
 * hacia los handlers registrados por nombre de evento. Varios handlers
 * pueden registrarse para el mismo evento (p.ej. "Docked" interesa tanto a
 * Navegación como a Estación).
 */
class EventRouter {
  constructor() {
    this._handlers = new Map();
    this._catchAll = [];
  }

  on(eventName, handler) {
    if (!this._handlers.has(eventName)) this._handlers.set(eventName, []);
    this._handlers.get(eventName).push(handler);
    return this;
  }

  /** Se llama para TODOS los eventos, útil para contadores globales/logging. */
  onAny(handler) {
    this._catchAll.push(handler);
    return this;
  }

  dispatch(event) {
    if (!event || typeof event.event !== 'string') return;

    for (const handler of this._catchAll) {
      try {
        handler(event);
      } catch (err) {
        console.error(`[event-router] Error en handler global para ${event.event}:`, err);
      }
    }

    const handlers = this._handlers.get(event.event);
    if (!handlers) return;
    for (const handler of handlers) {
      try {
        handler(event);
      } catch (err) {
        console.error(`[event-router] Error en handler de ${event.event}:`, err);
      }
    }
  }
}

module.exports = EventRouter;
