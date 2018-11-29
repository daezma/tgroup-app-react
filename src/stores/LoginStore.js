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

  ClearSession() {
    this.loginResponse.usersession = '';
    this.loginResponse.error = false;
    this.loginResponse.msgError = '';
  }

  updateValue(value, tipo) {
    switch (tipo) {
      case 'U':
        this.loginData.name = value;
        break;
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
      case 'S':
        this.loginResponse.usersession = value;
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
  ClearSession: action
});

export default LoginStore;
