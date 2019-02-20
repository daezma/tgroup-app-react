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
        const { recven, penven } = this.props;
        let arraycito = recven.list_medios_cobro.map(option => {
          const fila = { ...option };
          if (option.value === +event.target.id) {
            fila.saldo = event.target.value;
          }
          return fila;
        });
        recven.List_medios_cobro(arraycito);
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

      eliminarCheque = nroCheque => {
        this.props.recven.Cheques(this.props.recven.cheques.filter(cheque => cheque.numero !== nroCheque));
      };

      closeModal = () => {
        this.setState({ modalChequeOpen: false });
      };

      modalCheque = (cuenta, descCuenta) => {
        const { recven } = this.props;
        recven.DataChequeModal({
          banco: '',
          numero: '',
          importe: '',
          tipo: 'C',
          noALaOrden: false,
          fecEmi: '',
          fecDep: '',
          cuenta: cuenta,
          descCuenta: descCuenta
        });
        this.setState({ modalChequeOpen: true });
      };

      aceptarModal = () => {
        const { recven } = this.props;
        recven.Cheques([...recven.cheques, recven.dataChequeModal]);
        this.setState({ modalChequeOpen: false });
      };

      render() {
        const { recven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => (
            <React.Fragment key={option.value}>
              {option.label}
              <br />
              {option.tipo !== 'C' ? ( //TODO: Cambiar a V despues de las pruebas
                <TextField
                  required
                  id={String(option.value)}
                  placeholder='Importe'
                  variant='outlined'
                  margin='normal'
                  type='number'
                  value={option.saldo}
                  onChange={this.handleChangeImporte()}
                />
              ) : (
                <>
                  <Button onClick={() => this.modalCheque(option.value, option.label)}>Cheque</Button>
                  <br />
                  <ChequesList
                    cheques={recven.cheques.filter(cheque => cheque.cuenta === option.value)}
                    click={this.eliminarCheque}
                  />
                </>
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
