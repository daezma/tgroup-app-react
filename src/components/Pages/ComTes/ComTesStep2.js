import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { MediosCobro } from '../../../api/Consultas';
import { TextField, Paper, Button } from '@material-ui/core';
import style from './ComTes.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChequesList from '../../Cheques/ChequesList';
import ChequeModal from '../../Cheques/ChequeModal';

const ComTesStep2 = inject('comtes', 'login')(
  observer(
    class ComTesStep2 extends Component {
      state = {
        modalChequeOpen: false
      };

      componentDidMount = () => {
        const { comtes } = this.props;
        this.CargarMediosPago();
        comtes.ImporteRestanteCuentas(parseFloat(comtes.saldo === '' ? 0 : comtes.saldo).toFixed(2));
      };

      CargarMediosPago = async () => {
        this.props.comtes.Loading(true);
        const medios = await MediosCobro(this.props.login.UserSession);
        this.props.comtes.List_medios_cobro(medios);
        this.props.comtes.Loading(false);
      };

      handleChangeImporte = () => event => {
        const { comtes } = this.props;
        let arraycito = comtes.list_medios_cobro.map(option => {
          const fila = { ...option };
          if (option.value === +event.target.id) {
            fila.saldo = event.target.value;
          }
          return fila;
        });
        comtes.List_medios_cobro(arraycito);
        this.actualizarSaldoRestante();
      };

      handleDlbClick = () => event => {
        const { comtes } = this.props;
        let arraycito = comtes.list_medios_cobro.map(option => {
          const fila = { ...option };
          if (option.value === +event.target.id) {
            fila.saldo = comtes.importeRestanteCuentas;
          }
          return fila;
        });
        comtes.List_medios_cobro(arraycito);
        this.actualizarSaldoRestante();
      };

      eliminarCheque = nroCheque => {
        const { comtes } = this.props;
        const cheque = comtes.cheques.find(cheque => cheque.NUMERO2 === nroCheque);
        comtes.Cheques(comtes.cheques.filter(cheque => cheque.NUMERO2 !== nroCheque));
        comtes.List_medios_cobro(
          comtes.list_medios_cobro.map(cuenta => {
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
        const { comtes } = this.props;
        comtes.DataChequeModal({
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
        const { comtes } = this.props;
        comtes.ImporteRestanteCuentas(
          (
            parseFloat(comtes.saldo === '' ? 0 : comtes.saldo) +
            (comtes.list_medios_cobro
              ? comtes.list_medios_cobro.reduce((anterior, actual) => {
                  return anterior + parseFloat(actual.saldo === '' ? 0 : actual.saldo);
                }, 0)
              : 0)
          ).toFixed(2)
        );
      };

      aceptarModal = () => {
        const { comtes } = this.props;
        comtes.Cheques([...comtes.cheques, comtes.dataChequeModal]);
        comtes.List_medios_cobro(
          comtes.list_medios_cobro.map(cuenta => {
            var tmpCuenta = { ...cuenta };
            if (tmpCuenta.value === comtes.dataChequeModal.FK_ERP_CUE_TES) {
              tmpCuenta.saldo =
                tmpCuenta.saldo === ''
                  ? comtes.dataChequeModal.IMPORTE
                  : parseFloat(tmpCuenta.saldo) + parseFloat(comtes.dataChequeModal.IMPORTE);
            }
            return tmpCuenta;
          })
        );
        this.actualizarSaldoRestante();
        this.setState({ modalChequeOpen: false });
      };

      render() {
        const { comtes } = this.props;
        let medios;
        if (comtes.list_medios_cobro !== null) {
          medios = comtes.list_medios_cobro.map(option => (
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
                    cheques={comtes.cheques.filter(cheque => cheque.FK_ERP_CUE_TES === option.value)}
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
              {comtes.loading ? (
                <>
                  <CircularProgress />
                  <br />
                </>
              ) : (
                <>
                  <p>Saldo pendiente: ${comtes.importeRestanteCuentas}</p>
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

export default ComTesStep2;
