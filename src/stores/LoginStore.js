import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class LoginStore {
  constructor() {
    this.inicializar();
  }

  inicializar() {
    this.loginResponse = {
      error: false,
      msgError: '',
      usersession: ''
    };
    this.loginData = {
      name: '',
      pass: '',
      base: ''
    };
    this.openDialog = false;
    this.msgError = '';
    this.loading = false;
  }

  get LoginResponse() {
    return this.loginResponse;
  }

  get User() {
    return this.loginData.name;
  }

  setUser(value) {
    this.loginData.name = value;
  }

  get Pass() {
    return this.loginData.pass;
  }

  get Base() {
    return this.loginData.base;
  }

  get openDialogState() {
    return this.openDialog;
  }

  get msgErrorData() {
    return this.msgError;
  }

  get UserSession() {
    return this.loginResponse.usersession;
  }

  setUserSession(value) {
    this.loginResponse.usersession = value;
  }

  ClearSession() {
    this.loginResponse.usersession = '';
    this.loginResponse.error = false;
    this.loginResponse.msgError = '';
  }

  updateValue(value, tipo) {
    switch (tipo) {
      case 'P':
        this.loginData.pass = value;
        break;
      case 'B':
        this.loginData.base = value;
        break;
      case 'O':
        this.openDialog = value;
        break;
      case 'M':
        this.msgError = value;
        break;
      case 'L':
        this.loginResponse = value;
        break;
      case 'X':
        this.loading = value;
        break;
      default:
        break;
    }
  }
}

decorate(LoginStore, {
  loginResponse: observable,
  loginData: observable,
  openDialog: observable,
  msgError: observable,
  loading: observable,
  LoginResponse: computed,
  User: computed,
  Pass: computed,
  Base: computed,
  openDialogState: computed,
  msgErrorData: computed,
  UserSession: computed,
  updateValue: action,
  inicializar: action,
  ClearSession: action,
  setUser: action,
  setUserSession: action
});

export default LoginStore;
