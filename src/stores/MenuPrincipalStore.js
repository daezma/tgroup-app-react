import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class MenuPrincipalStore {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.anchorLogin = null;
    this.openMenu = false;
  }

  get OpenLogin() {
    return Boolean(this.anchorLogin);
  }

  get OpenMenu() {
    return this.openMenu;
  }

  SetAnchorLogin(value) {
    this.anchorLogin = value;
  }

  SetOpenMenu = value => {
    this.openMenu = value;
  };
}

decorate(MenuPrincipalStore, {
  openMenu: observable,
  anchorLogin: observable,
  OpenLogin: computed,
  OpenMenu: computed,
  SetAnchorLogin: action,
  SetOpenMenu: action,
  initialize: action
});

export default MenuPrincipalStore;
