import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { MediosCobro } from '../../api/Consultas';
import { TextField, Paper, Button } from '@material-ui/core';
import style from './RecVen.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const RecVenStep2 = inject('recven', 'login', 'penven')(
  observer(
    class RecVenStep2 extends Component {
      componentDidMount = () => {
        this.CargarMediosPago();
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
            fila.saldo = +event.target.value;
          }
          return fila;
        });
        recven.List_medios_cobro(arraycito);
      };

      render() {
        const { recven, penven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => (
            <React.Fragment key={option.value}>
              {option.label}
              <br />
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
              <br />
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
                  <p>
                    Saldo pendiente:
                    {(
                      parseInt(recven.saldo) +
                      parseInt(penven.SaldoImp) -
                      (recven.list_medios_cobro
                        ? recven.list_medios_cobro.reduce((anterior, actual) => {
                            return anterior + actual.saldo;
                          }, 0)
                        : 0)
                    ).toFixed(2)}
                  </p>
                  {medios}
                </>
              )}
            </div>
            <Button variant='contained' color='primary'>
              Cargar cheques
            </Button>
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep2;
