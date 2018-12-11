import { itsGetClassSimple } from './itrisApiConnect';

let negocio = null;

/**
 * Permite cargar una lista con las Unidades de negocio
 * @param {string} usersession
 * @returns {Array} Array con value y label
 */
export async function fk_erp_uni_neg(usersession) {
  if (negocio === null) {
    negocio = [];
    const response = await itsGetClassSimple(usersession, 'ERP_UNI_NEG');
    response.forEach(element => {
      const obj = {
        value: element.ID,
        label: element.DESCRIPCION
      };
      negocio.push(obj);
    });

    return negocio;
  } else return negocio;
}
