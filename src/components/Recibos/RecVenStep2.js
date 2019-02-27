import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { MediosCobro } from '../../api/Consultas';
import { TextField, Paper, Button } from '@material-ui/core';
import style from './RecVen.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChequesList from '../Cheques/ChequesList';
import ChequeModal from '../Cheques/ChequeModal';

const RecVenStep2 = inject('recven', 'login', 'penven')(
  observer(
    class RecVenStep2 extends Component {
      state = {
        modalChequeOpen: false
      };

      componentDidMount = () => {
        const { recven, penven } = this.props;
        this.CargarMediosPago();
        recven.ImporteRestanteCuentas(
          (
            parseFloat(recven.saldo === '' ? 0 : recven.saldo) +
            parseFloat(penven.SaldoImp === '' ? 0 : penven.SaldoImp)
          ).toFixed(2)
        );
      };

      CargarMediosPago = async () => {
        this.props.recven.Loading(true);
        const medios = await MediosCobro(this.props.login.UserSession);
        this.props.recven.List_medios_cobro(medios);
        this.props.recven.Loading(false);
      };

      handleChangeImporte = () => event => {
        const { recven } = this.props;
        let arraycito = recven.list_medios_cobro.map(option => {
          const fila = { ...option };
          if (option.value === +event.target.id) {
            fila.saldo = event.target.value;
          }
          return fila;
        });
        recven.List_medios_cobro(arraycito);
        this.actualizarSaldoRestante();
      };

      handleDlbClick = () => event => {
        const { recven } = this.props;
        let arraycito = recven.list_medios_cobro.map(option => {
          const fila = { ...option };
          if (option.value === +event.target.id) {
            fila.saldo = recven.importeRestanteCuentas;
          }
          return fila;
        });
        recven.List_medios_cobro(arraycito);
        this.actualizarSaldoRestante();
      };

      eliminarCheque = nroCheque => {
        const { recven } = this.props;
        const cheque = recven.cheques.find(cheque => cheque.NUMERO2 === nroCheque);
        recven.Cheques(recven.cheques.filter(cheque => cheque.NUMERO2 !== nroCheque));
        recven.List_medios_cobro(
          recven.list_medios_cobro.map(cuenta => {
            var tmpCuenta = { ...cuenta };
            if (tmpCuenta.value === cheque.FK_ERP_CUE_TES) {
              tmpCuenta.saldo = parseFloat(tmpCuenta.saldo) - parseFloat(cheque.IMPORTE);
            }
            return tmpCuenta;
          })
        );
        this.actualizarSaldoRestante();
      };

      closeModal = () => {
        this.setState({ modalChequeOpen: false });
      };

      modalCheque = (cuenta, descCuenta) => {
        const { recven } = this.props;
        recven.DataChequeModal({
          FK_ERP_BANCOS: '',
          NUMERO2: '',
          IMPORTE: '',
          TIPO: 'C',
          NO_ALAORDEN: false,
          FEC_EMI: '',
          FEC_DEP: '',
          ORIGEN: '',
          FK_ERP_CUE_TES: parseInt(cuenta),
          descCuenta: descCuenta
        });
        this.setState({ modalChequeOpen: true });
      };

      actualizarSaldoRestante = () => {
        const { recven, penven } = this.props;
        recven.ImporteRestanteCuentas(
          (
            parseFloat(recven.saldo === '' ? 0 : recven.saldo) +
            parseFloat(penven.SaldoImp === '' ? 0 : penven.SaldoImp) -
            (recven.list_medios_cobro
              ? recven.list_medios_cobro.reduce((anterior, actual) => {
                  return anterior + parseFloat(actual.saldo === '' ? 0 : actual.saldo);
                }, 0)
              : 0)
          ).toFixed(2)
        );
      };

      aceptarModal = () => {
        const { recven } = this.props;
        recven.Cheques([...recven.cheques, recven.dataChequeModal]);
        recven.List_medios_cobro(
          recven.list_medios_cobro.map(cuenta => {
            var tmpCuenta = { ...cuenta };
            if (tmpCuenta.value === recven.dataChequeModal.FK_ERP_CUE_TES) {
              tmpCuenta.saldo =
                tmpCuenta.saldo === ''
                  ? recven.dataChequeModal.IMPORTE
                  : parseFloat(tmpCuenta.saldo) + parseFloat(recven.dataChequeModal.IMPORTE);
            }
            return tmpCuenta;
          })
        );
        this.actualizarSaldoRestante();
        this.setState({ modalChequeOpen: false });
      };

      render() {
        const { recven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => (
            <React.Fragment key={option.value}>
              {option.tipo !== 'V' ? (
                <TextField
                  required
                  id={String(option.value)}
                  label={option.label}
                  placeholder='Importe'
                  variant='outlined'
                  margin='normal'
                  type='number'
                  value={option.saldo}
                  onChange={this.handleChangeImporte()}
                  onDoubleClick={this.handleDlbClick()}
                />
              ) : (
                <div>
                  <p>{option.label}</p>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => this.modalCheque(option.value, option.label)}
                  >
                    Cargar cheque
                  </Button>
                  <br />
                  <ChequesList
                    cheques={recven.cheques.filter(cheque => cheque.FK_ERP_CUE_TES === option.value)}
                    click={this.eliminarCheque}
                  />
                </div>
              )}
            </React.Fragment>
          ));
        }
        return (
          <Paper className={style.paper}>
            <div>
              {recven.loading ? (
                <>
                  <CircularProgress />
                  <br />
                </>
              ) : (
                <>
                  <p>Saldo pendiente: ${recven.importeRestanteCuentas}</p>
                  {medios}
                </>
              )}
            </div>
            <ChequeModal
              open={this.state.modalChequeOpen}
              onClose={this.closeModal}
              data={this.state.dataChequeModal}
              aceptar={this.aceptarModal}
            />
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep2;
