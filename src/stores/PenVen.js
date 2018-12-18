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
    this.empresaImputacion = null;
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

  get EmpresaImputacion() {
    return this.empresaImputacion;
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

  SetEmpresaImputacion = value => {
    this.empresaImputacion = value;
  };
}

decorate(PenVen, {
  data: observable,
  selection: observable,
  msgAlert: observable,
  facturas: observable,
  empresaImputacion: observable,
  Data: computed,
  Selection: computed,
  Facturas: computed,
  EmpresaImputacion: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action,
  SetSelection: action,
  SetFacturas: action,
  SetEmpresaImputacion: action
});

export default PenVen;
