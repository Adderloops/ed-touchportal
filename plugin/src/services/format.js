'use strict';

/**
 * Formats a number with English thousands separators
 * (1,000, 1,234,567, -1,500,000...). Si `n` no es un numero (p.ej. el
 * texto "MISIÓN_REQUERIDA" que powerplay.js guarda a veces en el mismo
 * state), se devuelve tal cual sin tocar -- mismo criterio que pct() en
 * cmdr.js, así que nunca rompe un valor que no sea numérico.
 *
 * Igual que en cmdr.js/credits: este helper solo formatea el string que
 * se manda a Touch Portal. Ningun handler de este proyecto relee estos
 * states como numero (los acumuladores usan variables propias en
 * `session`, no `state.get(...)`), asi que no hace falta un valor "raw"
 * aparte como si hizo falta para creditos -- pero si en el futuro se
 * añade un handler que sí releyera uno de estos states para sumarle
 * algo, hay que aplicar el mismo patron que creditos (variable raw
 * aparte, formatear solo al enviar).
 */
function formatThousands(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) return n;
  const rounded = Math.round(n);
  const sign = rounded < 0 ? '-' : '';
  return sign + Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = { formatThousands };
