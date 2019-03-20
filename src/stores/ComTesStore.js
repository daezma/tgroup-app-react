import { observable, computed, configure, action, decorate } from 'mobx';
import { FechaHoy } from '../helpers/Fechas';

configure({ enforceActions: 'always' });

class ComTesStore {
  constructor() {
    this.Inicializar();
  }

  Inicializar() {
    this._fecha = FechaHoy();
    this._list_uni_neg = [];
    this._fk_erp_uni_neg = '';
    this._id = '';
    this._cueTes = null;
    this._imp_total = 0;
    this._saldo = 0;
    this._observaciones = '';
    this._list_empresas = [];
    this._loading = false;
    this._list_medios_cobro = null;
    this._importeRestanteCuentas = 0;
    this._error = '';
    this._cheques = [];
    this._dataChequeModal = {};
    this._generado = false;
  }

  get fecha() {
    return this._fecha;
  }
  Fecha(value) {
    this._fecha = value;
  }

  get importeRestanteCuentas() {
    return this._importeRestanteCuentas;
  }
  ImporteRestanteCuentas(value) {
    this._importeRestanteCuentas = value;
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

  get loading() {
    return this._loading;
  }
  Loading(value) {
    this._loading = value;
  }

  get list_medios_cobro() {
    return this._list_medios_cobro;
  }
  List_medios_cobro(value) {
    this._list_medios_cobro = value;
  }

  get error() {
    return this._error;
  }

  Error(value) {
    this._error = value;
  }

  get cheques() {
    return this._cheques;
  }

  Cheques(value) {
    this._cheques = value;
  }

  get dataChequeModal() {
    return this._dataChequeModal;
  }

  DataChequeModal(value) {
    this._dataChequeModal = value;
  }

  get generado() {
    return this._generado;
  }

  Generado(value) {
    this._generado = value;
  }
}

decorate(ComTesStore, {
  _fecha: observable,
  _fk_erp_uni_neg: observable,
  _id: observable,
  _imp_total: observable,
  _saldo: observable,
  _observaciones: observable,
  _cueTes: observable,
  _list_uni_neg: observable,
  _loading: observable,
  _list_medios_cobro: observable,
  _importeRestanteCuentas: observable,
  _error: observable,
  _cheques: observable,
  _dataChequeModal: observable,
  _generado: observable,
  fecha: computed,
  fk_erp_uni_neg: computed,
  id: computed,
  imp_total: computed,
  saldo: computed,
  observaciones: computed,
  cueTes: computed,
  list_uni_neg: computed,
  loading: computed,
  list_medios_cobro: computed,
  importeRestanteCuentas: computed,
  error: computed,
  cheques: computed,
  dataChequeModal: computed,
  generado: computed,
  Fecha: action,
  Fk_erp_uni_neg: action,
  Id: action,
  Imp_total: action,
  Saldo: action,
  Observaciones: action,
  CueTes: action,
  Inicializar: action,
  List_uni_neg: action,
  List_medios_cobro: action,
  Loading: action,
  ImporteRestanteCuentas: action,
  Error: action,
  Cheques: action,
  DataChequeModal: action,
  Generado: action
});

export default ComTesStore;
