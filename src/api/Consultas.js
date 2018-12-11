import { itsGetClassSimple } from './itrisApiConnect';

/**
 * Se utiliza para obtener los medios de cobro de los recibos de ventas
 * @param {string} usersession
 * @returns {Array} Devuelve un array
 */
export async function MediosCobro(usersession) {
  let medios = [];
  const response = await itsGetClassSimple(usersession, 'ERP_CUE_TES', '_APP = 1');
  response.forEach(element => {
    const obj = {
      value: element.ID,
      label: element.DESCRIPCION,
      saldo: null
    };
    medios.push(obj);
  });

  return medios;
}
