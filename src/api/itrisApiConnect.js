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
    const response = await axios.get(`${itris_url}class`, {
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

export async function itsLogin(database, username, password) {
  try {
    const response = await axios.post(`${itris_url}login`, LoginToJson(database, username, password));
    loginResponse.usersession = response.data.usersession;
  } catch (error) {
    if (
      error.response ? (loginResponse.msgError = error.response.data.message) : (loginResponse.msgError = error.message)
    );
    loginResponse.error = true;
  }
  return loginResponse;
}

export async function itsLogout(usersession) {
  let msg = '';
  try {
    await axios.post(`${itris_url}logout`, LogoutToJson(usersession));
    loginResponse.usersession = '';
    return '';
  } catch (error) {
    if (error.response ? (msg = error.response.data.message) : (msg = error.message));
    return msg;
  }
}

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
      const response = await axios.get(`${itris_url}class`, {
        params: parameters
      });
      return response.data.data;
    } catch (error) {
      if (error.response ? (msgError = error.response.data.message) : (msgError = error.message));
      return msgError;
    }
  } else {
    return 'Usuario no habilitado par acceder a este módulo';
  }
}

//Este ItsGetClass no tiene seguridad del usuario, se usa para buscadores y listas dinamicas.
export async function itsGetClassSimple(usersession, clase, recordCount, sqlFilter) {
  let msgError = '';
  const parameters = {
    usersession: usersession,
    class: clase,
    recordCount: recordCount,
    sqlFilter: sqlFilter
  };
  try {
    const response = await axios.get(`${itris_url}class`, {
      params: parameters
    });
    return response.data.data;
  } catch (error) {
    if (error.response ? (msgError = error.response.data.message) : (msgError = error.message));
    return msgError;
  }
}
