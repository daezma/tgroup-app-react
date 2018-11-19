import { observable, computed } from 'mobx';

class LoginStore {
  @observable loginResponse = {
    error: false,
    msgError: '',
    usersession: ''
  };
  @observable user = '';

  @computed
  get LoginResponse() {
    return this.loginResponse;
  }

  @computed
  get User() {
    return this.user;
  }
}

export default LoginStore;
