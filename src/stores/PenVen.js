import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class PenVen {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.data = null;
    this.msgAlert = '';
  }

  get Data() {
    return this.data;
  }

  get MsgAlert() {
    return this.msgAlert;
  }

  SetData = value => {
    this.data = value;
  };

  SetMsgAlert = value => {
    this.msgAlert = value;
  };
}

decorate(PenVen, {
  data: observable,
  msgAlert: observable,
  Data: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action
});

export default PenVen;
