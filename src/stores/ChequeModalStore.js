import { observable, computed, configure, action, decorate } from 'mobx';

configure({ enforceActions: 'always' });

class ChequeModalStore {
  constructor() {
    this.Inicializar();
  }

  Inicializar() {
    this._dataChequeModal = {};
  }

  get dataChequeModal() {
    return this._dataChequeModal;
  }

  DataChequeModal(value) {
    this._dataChequeModal = value;
  }
}

decorate(ChequeModalStore, {
  _dataChequeModal: observable,
  dataChequeModal: computed,
  DataChequeModal: action,
  Inicializar: action
});

export default ChequeModalStore;
