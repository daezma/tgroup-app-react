import { itris_url } from './urls';
import axios from 'axios';

const loginResponse = {
  error: false,
  msgError: '',
  usersession: ''
};

const LoginToJson = (database, username, password) => {
  const obj = {
    database: database,
    username: username,
    password: password
  };
  return JSON.stringify(obj);
};

const LogoutToJson = usersession => {
  const obj = {
    usersession: usersession
  };
  return JSON.stringify(obj);
};

/**
 * Verifica la seguridad del usuario al acceder a una tabla
 * @param {string} usersession
 * @param {string} username
 * @param {string} clase
 */
async function itsSecurityCheck(usersession, username, clase) {
  let valido = false;
  const sqlFilter = `FK_ITRIS_CLASSES = '${clase}' and MK_ITRIS_GROUPS in (select MK_ITRIS_GROUPS from ITRIS_GRO_USE 
    where MK_ITRIS_USERS = '${username}')`;
  const parameters = {
    usersession: usersession,
    class: 'ITRIS_GRO_CLA',
    sqlFilter: sqlFilter
  };
  try {
    const response = await axios.get(`${itris_url}/class`, {
      params: parameters
    });

    response.data.data.forEach(element => {
      if (element.GCLVISIBLE === true) valido = true;
    });

    return valido;
  } catch (error) {
    return valido;
  }
}

/**
 * Login a la aplicación Itris
 * @param {string} database
 * @param {string} username
 * @param {string} password
 */
export async function itsLogin(database, username, password) {
  try {
    const response = await axios.post(`${itris_url}/login`, LoginToJson(database, username, password));
    loginResponse.usersession = response.data.usersession;
  } catch (error) {
    if (
      error.response ? (loginResponse.msgError = error.response.data.message) : (loginResponse.msgError = error.message)
    );
    loginResponse.error = true;
  }
  return loginResponse;
}

/**
 * Logout de la aplicación Itris
 * @param {string} usersession
 */
export async function itsLogout(usersession) {
  let msg = '';
  try {
    await axios.post(`${itris_url}/logout`, LogoutToJson(usersession));
    loginResponse.usersession = '';
    return '';
  } catch (error) {
    if (error.response ? (msg = error.response.data.message) : (msg = error.message));
    return msg;
  }
}

/**
 * Consulta datos de las tablas de Itris. Realiza la validación de seguridad.
 * @param {string} usersession
 * @param {string} clase
 * @param {string} username
 * @param {integer} recordCount opcional, puede ser null
 * @param {string} sqlFilter opcional, puede ser ''
 * @param {string} sqlSort opcional, puede ser ''
 */
export async function itsGetClass(usersession, clase, username, recordCount, sqlFilter, sqlSort = '') {
  let valido = false;
  //Verificar seguridad del usuario
  valido = await itsSecurityCheck(usersession, username, clase);
  if (valido) {
    let msgError = '';
    const parameters = {
      usersession: usersession,
      class: clase,
      recordCount: recordCount,
      sqlFilter: sqlFilter
    };
    try {
      const response = await axios.get(`${itris_url}/class`, {
        params: parameters
      });
      return response.data.data;
    } catch (error) {
      if (error.response ? (msgError = error.response.data.message) : (msgError = error.message));
      return msgError;
    }
  } else {
    return 'Usuario no habilitado para acceder a este módulo';
  }
}

/**
 *
 * Se utiliza para cargar listas y buscadores
 * @param {string} usersession
 * @param {string} clase
 * @param {string} sqlFilter opcional, puede ser ''
 * @param {integer} recordCount opcional, puede ser null
 * @returns {json} JSON - Msg Error
 */
export async function itsGetClassSimple(usersession, clase, sqlFilter, recordCount) {
  let msgError = '';
  const parameters = {
    usersession: usersession,
    class: clase,
    recordCount: recordCount,
    sqlFilter: sqlFilter
  };
  try {
    const response = await axios.get(`${itris_url}/class`, {
      params: parameters
    });
    return response.data.data;
  } catch (error) {
    if (error.response ? (msgError = error.response.data.message) : (msgError = error.message));
    return msgError;
  }
}

/**
 * Inserta un nuevo registro de una clase
 * @param {string} usersession
 * @param {string} clase
 * @param {Array} data
 */
export async function itsClassInsert(usersession, clase, data) {
  let msg = '';
  const datos = {
    usersession: usersession,
    class: clase,
    data: Array(data)
  };
  try {
    await axios.post(`${itris_url}/class`, JSON.stringify(datos));
    loginResponse.usersession = '';
    return '';
  } catch (error) {
    if (error.response ? (msg = error.response.data.message) : (msg = error.message));
    return msg;
  }
}
