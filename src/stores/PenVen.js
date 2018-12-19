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
    this.errorRecibo = '';
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

  get ErrorRecibo() {
    return this.errorRecibo;
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

  SetErrorRecibo = value => {
    this.errorRecibo = value;
  };
}

decorate(PenVen, {
  data: observable,
  selection: observable,
  msgAlert: observable,
  facturas: observable,
  empresaImputacion: observable,
  errorRecibo: observable,
  Data: computed,
  Selection: computed,
  Facturas: computed,
  EmpresaImputacion: computed,
  ErrorRecibo: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action,
  SetSelection: action,
  SetFacturas: action,
  SetEmpresaImputacion: action,
  SetErrorRecibo: action
});

export default PenVen;
