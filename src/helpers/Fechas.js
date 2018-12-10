//yyyy-MM-dd
export function FechaHoy() {
  let f = new Date();
  return f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate();
}
