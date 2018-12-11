import { itsGetClassSimple } from './itrisApiConnect';

let busqueda = null;

/**
 * Devuelve un array con los datos de resultado. Las tablas deben tener ID y DESCRIPCION
 * @param {string} usersession
 * @param {string} tabla
 * @param {string} sqlFilter
 * @returns {Array} Array con los datos resultados
 */
async function Buscador(usersession, tabla, sqlFilter) {
  if (busqueda === null) {
    busqueda = [];
    const response = await itsGetClassSimple(usersession, tabla, sqlFilter);
    response.forEach(element => {
      const obj = {
        value: element.ID,
        label: element.DESCRIPCION
      };
      busqueda.push(obj);
    });

    return busqueda;
  } else return busqueda;
}

/**
 * Se utiliza para buscar empresas
 * @param {string} usersession
 * @param {string} sqlFilter
 * @returns {Array} Array con las empresas de resultado
 */
export async function BuscadorEmpresa(usersession, sqlFilter) {
  const sqlFilterFinal = `ID like '%${sqlFilter}%' or DESCRIPCION like '%${sqlFilter}%'`;
  return await Buscador(usersession, 'ERP_EMPRESAS', sqlFilterFinal);
}
