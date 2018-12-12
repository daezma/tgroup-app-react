import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class PenVen {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.data = null;
    this.msgAlert = '';
    this.selection = [];
  }

  get Data() {
    return this.data;
  }

  get Selection() {
    return this.selection;
  }
  get MsgAlert() {
    return this.msgAlert;
  }

  SetData = value => {
    this.data = value;
  };

  SetSelection = value => {
    this.selection = value;
  };

  SetMsgAlert = value => {
    this.msgAlert = value;
  };
}

decorate(PenVen, {
  data: observable,
  selection: observable,
  msgAlert: observable,
  Data: computed,
  Selection: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action,
  SetSelection: action
});

export default PenVen;
