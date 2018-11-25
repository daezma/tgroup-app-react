import { observable, computed, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class LoginStore {
  @observable loginResponse = {
    error: false,
    msgError: '',
    usersession: ''
  };
  @observable loginData = {
    name: '',
    pass: '',
    base: ''
  };
  @observable openDialog = false;
  @observable msgError = '';
  @observable loading = false;

  @computed
  get LoginResponse() {
    return this.loginResponse;
  }

  @computed
  get User() {
    return this.loginData.name;
  }

  @computed
  get Pass() {
    return this.loginData.pass;
  }

  @computed
  get Base() {
    return this.loginData.base;
  }

  @computed
  get openDialogState() {
    return this.openDialog;
  }

  @computed
  get msgErrorData() {
    return this.msgError;
  }

  @computed
  get UserSession() {
    return this.loginResponse.usersession;
  }

  @action
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
      default:
        break;
    }
  }
}

export default LoginStore;
