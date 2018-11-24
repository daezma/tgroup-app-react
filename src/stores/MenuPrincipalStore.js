import { observable, computed, configure, action } from 'mobx';

configure({ enforceActions: 'always' });

class MenuPrincipalStore {
  @observable anchor = false;

  @computed
  get Open() {
    return Boolean(this.anchor);
  }

  @computed
  get Anchor() {
    return this.anchor;
  }

  @action
  UpdateAnchor(value) {
    this.anchor = value;
  }
}

export default MenuPrincipalStore;
