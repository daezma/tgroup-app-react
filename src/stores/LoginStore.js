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
    this.warnTimeout = null;
    this.logoutTimeout = null;
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

  get LogoutTimeout() {
    return this.logoutTimeout;
  }

  get WarnTimeout() {
    return this.warnTimeout;
  }

  setUserSession(value) {
    this.loginResponse.usersession = value;
  }

  ClearSession() {
    this.inicializar();
  }

  setOpenDialog(value) {
    this.openDialog = value;
  }

  setLoading(value) {
    this.loading = value;
  }

  setMsgError(value) {
    this.msgError = value;
  }

  setPass(value) {
    this.loginData.pass = value;
  }

  setBase(value) {
    this.loginData.base = value;
  }

  setLogoutTimeout(value) {
    this.logoutTimeout = value;
  }

  setWarnTimeout(value) {
    this.warnTimeout = value;
  }
}

decorate(LoginStore, {
  loginResponse: observable,
  logoutTimeout: observable,
  warnTimeout: observable,
  loginData: observable,
  openDialog: observable,
  msgError: observable,
  loading: observable,
  LoginResponse: computed,
  User: computed,
  Pass: computed,
  Base: computed,
  WarnTimeout: computed,
  LogoutTimeout: computed,
  openDialogState: computed,
  msgErrorData: computed,
  UserSession: computed,
  updateValue: action,
  inicializar: action,
  ClearSession: action,
  setUser: action,
  setUserSession: action,
  setOpenDialog: action,
  setLoading: action,
  setPass: action,
  setBase: action,
  setMsgError: action,
  setWarnTimeout: action,
  setLogoutTimeout: action
});

export default LoginStore;
