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
    this.facturas = null;
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

  get Facturas() {
    return this.facturas;
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

  SetFacturas = value => {
    this.facturas = value;
  };
}

decorate(PenVen, {
  data: observable,
  selection: observable,
  msgAlert: observable,
  facturas: observable,
  Data: computed,
  Selection: computed,
  Facturas: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action,
  SetSelection: action,
  SetFacturas: action
});

export default PenVen;
