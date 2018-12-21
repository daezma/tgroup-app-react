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
    this.saldoImp = 0;
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

  get SaldoImp() {
    return this.saldoImp;
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

  SetSaldoImp = value => {
    this.saldoImp = value;
  };
}

decorate(PenVen, {
  data: observable,
  selection: observable,
  msgAlert: observable,
  facturas: observable,
  empresaImputacion: observable,
  errorRecibo: observable,
  saldoImp: observable,
  Data: computed,
  Selection: computed,
  Facturas: computed,
  EmpresaImputacion: computed,
  ErrorRecibo: computed,
  SaldoImp: computed,
  SetData: action,
  initialize: action,
  SetMsgAlert: action,
  SetSelection: action,
  SetFacturas: action,
  SetEmpresaImputacion: action,
  SetErrorRecibo: action,
  SetSaldoImp: action
});

export default PenVen;
