/**
 * Devuelve la fecha de hoy
 * @returns {string} fecha en formato yyyy-MM-dd
 */
export function FechaHoy() {
  let f = new Date();
  return f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate();
}
