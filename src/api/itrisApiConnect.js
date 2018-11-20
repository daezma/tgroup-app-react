import { itris_url } from './urls';

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

const evaluateError = data => {
  if (data.error === true) {
    return data.message;
  } else {
    return '';
  }
};

export const itsLogin = (database, username, password) => {
  fetch(`${itris_url}login`, {
    method: 'POST',
    body: LoginJsonear(database, username, password),
    headers: new Headers({ 'Content-type': 'application/json' })
  })
    .then(resolve => {
      return resolve.json();
    })
    .catch(error => {
      loginResponse.error = true;
      loginResponse.msgError = error;
      return loginResponse;
    })
    .then(data => {
      if (evaluateError(data) === '') {
        loginResponse.error = false;
        loginResponse.usersession = data.usersession;
      } else {
        loginResponse.error = true;
        loginResponse.msgError = data.message;
      }
      //console.log(loginResponse);
      return loginResponse;
    });
};
