import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class MenuPrincipalStore {
  constructor() {
    this.inicializar();
  }

  inicializar() {
    this.anchor = null;
    this.anchorLogin = null;
  }

  get Open() {
    return Boolean(this.anchor);
  }

  get OpenLogin() {
    return Boolean(this.anchorLogin);
  }

  get Anchor() {
    return this.anchor;
  }

  UpdateAnchor(value) {
    this.anchor = value;
  }

  UpdateAnchorLogin(value) {
    this.anchorLogin = value;
  }
}

decorate(MenuPrincipalStore, {
  anchor: observable,
  anchorLogin: observable,
  Open: computed,
  OpenLogin: computed,
  Anchor: computed,
  UpdateAnchor: action,
  UpdateAnchorLogin: action,
  inicializar: action
});

export default MenuPrincipalStore;
