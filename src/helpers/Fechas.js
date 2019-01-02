/**
 * Devuelve la fecha de hoy
 * @returns {string} fecha en formato yyyy-MM-dd
 */
export function FechaHoy() {
  let f = new Date();
  return f.getFullYear() + '-' + String(f.getMonth() + 1).padStart(2, '0') + '-' + String(f.getDate()).padStart(2, '0');
}
