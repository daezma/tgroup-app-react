import { observable, computed, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class MenuPrincipalStore {
  @observable anchor = null;
  @observable anchorLogin = null;

  @computed
  get Open() {
    return Boolean(this.anchor);
  }

  @computed
  get OpenLogin() {
    return Boolean(this.anchorLogin);
  }

  @computed
  get Anchor() {
    return this.anchor;
  }

  @action
  UpdateAnchor(value) {
    this.anchor = value;
  }

  @action
  UpdateAnchorLogin(value) {
    this.anchorLogin = value;
  }
}

export default MenuPrincipalStore;
