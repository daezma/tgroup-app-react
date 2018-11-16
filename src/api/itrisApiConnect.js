import { itris_url } from './urls';

// export const apiPost = (url, obj) => () =>
//   fetch(`${url}`, {
//     method: 'POST',
//     body: JSON.stringify(obj),
//     headers: new Headers({ 'Content-type': 'application/json' })
//   })
//     .then(v => v.json())
//     .then(r => {
//       if (r.error) {
//         return Promise.reject(r.validation);
//       }
//       return r;
//     });

const LoginJsonear = (database, username, password) => {
  const obj = {
    database: database,
    username: username,
    password: password
  };
  return JSON.stringify(obj);
};

export const itsLogin = (database, username, password) => () =>
  //fetch(`${itris_url}/login`, {
  fetch('http://srv01.tgroup.com.ar:85/login', {
    method: 'POST',
    body: LoginJsonear(database, username, password),
    headers: new Headers({ 'Content-type': 'application/json' })
  })
    .then(data => {
      debugger;
      console.log(data);
    })
    .catch(error => {
      debugger;
      console.log(error);
    });
// {
//   "database": "BASE_ITRIS",
//   "username": "PRACTICA",
//   "password": "1234"
// }
