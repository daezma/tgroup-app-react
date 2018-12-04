import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class PenVen {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.data = null;
  }

  get Data() {
    return this.data;
  }

  SetData = value => {
    this.data = value;
  };
}

decorate(PenVen, {
  data: observable,
  Data: computed,
  SetData: action,
  initialize: action
});

export default PenVen;
