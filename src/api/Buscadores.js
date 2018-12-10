import { itsGetClassSimple } from './itrisApiConnect';

let busqueda = null;

export default async function Buscador(usersession, tabla, sqlFilter) {
  if (busqueda === null) {
    busqueda = [];
    const response = await itsGetClassSimple(usersession, tabla, null, sqlFilter);
    console.log(response);
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
