import { itris_url } from './urls';
import axios from 'axios';

const loginResponse = {
  error: false,
  msgError: '',
  usersession: ''
};

const LoginJsonear = (database, username, password) => {
  const obj = {
    database: database,
    username: username,
    password: password
  };
  return JSON.stringify(obj);
};

const LogoutJsonear = userssesion => {
  const obj = {
    userssesion: userssesion
  };
  return JSON.stringify(obj);
};

// const ClassToJson = (usersession, clase, recordCount, sqlFilter, sqlSort) => {
//   const obj = {
//     usersession: usersession,
//     class: clase,
//     recordCount: recordCount,
//     sqlFilter: sqlFilter,
//     sqlSort: sqlSort
//   };
//   return JSON.stringify(obj);
// };

export async function itsLogin(database, username, password) {
  try {
    const response = await axios.post(`${itris_url}login`, LoginJsonear(database, username, password));
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
  debugger;
  try {
    await axios.post(`${itris_url}logout`, LogoutJsonear(usersession));
    return '';
  } catch (error) {
    if (error.response ? (msg = error.response.data.message) : (msg = error.message));
    return msg;
  }
}

export async function itsGetClass(usersession, clase, recordCount = '', sqlFilter = '', sqlSort = '') {
  let msgError = '';
  const parameters = {
    usersession: usersession,
    class: clase
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
