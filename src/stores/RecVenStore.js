import { observable, computed, configure, action, decorate } from 'mobx';
import { FechaHoy } from '../helpers/Fechas';

configure({ enforceActions: 'always' });

class RecVenStore {
  constructor() {
    this.Inicializar();
  }

  Inicializar() {
    this._fecha = FechaHoy();
    this._fk_erp_empresas = '';
    this._list_uni_neg = [];
    this._fk_erp_uni_neg = null;
    this._id = '';
    this._cueTes = null;
    this._imp_total = 0;
    this._saldo = 0;
    this._observaciones = '';
  }

  get fecha() {
    return this._fecha;
  }
  Fecha(value) {
    this._fecha = value;
  }

  get fk_erp_empresas() {
    return this._fk_erp_empresas;
  }
  Fk_erp_empresas(value) {
    this._fk_erp_empresas = value;
  }

  get fk_erp_uni_neg() {
    return this._fk_erp_uni_neg;
  }
  Fk_erp_uni_neg(value) {
    this._fk_erp_uni_neg = value;
  }

  get id() {
    return this._id;
  }
  Id(value) {
    this._id = value;
  }

  get imp_total() {
    return this._imp_total;
  }
  Imp_total(value) {
    this._imp_total = value;
  }

  get saldo() {
    return this._saldo;
  }
  Saldo(value) {
    this._saldo = value;
  }

  get observaciones() {
    return this._observaciones;
  }
  Observaciones(value) {
    this._observaciones = value;
  }

  get cueTes() {
    return this._cueTes;
  }
  CueTes(value) {
    this._cueTes = value;
  }

  get list_uni_neg() {
    return this._list_uni_neg;
  }

  List_uni_neg(value) {
    this._list_uni_neg = value;
  }
}

decorate(RecVenStore, {
  _fecha: observable,
  _fk_erp_empresas: observable,
  _fk_erp_uni_neg: observable,
  _id: observable,
  _imp_total: observable,
  _saldo: observable,
  _observaciones: observable,
  _cueTes: observable,
  _list_uni_neg: observable,
  fecha: computed,
  fk_erp_empresas: computed,
  fk_erp_uni_neg: computed,
  id: computed,
  imp_total: computed,
  saldo: computed,
  observaciones: computed,
  cueTes: computed,
  list_uni_neg: computed,
  Fecha: action,
  Fk_erp_empresas: action,
  Fk_erp_uni_neg: action,
  Id: action,
  Imp_total: action,
  Saldo: action,
  Observaciones: action,
  CueTes: action,
  Inicializar: action,
  List_uni_neg: action
});

export default RecVenStore;
