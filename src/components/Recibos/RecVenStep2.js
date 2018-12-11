import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { MediosCobro } from '../../api/Consultas';
import { TextField, Paper } from '@material-ui/core';
import style from './RecVen.module.css';

const RecVenStep2 = inject('recven', 'login')(
  observer(
    class RecVenStep2 extends Component {
      componentDidMount = () => {
        this.CargarMediosPago();
      };

      CargarMediosPago = async () => {
        const medios = await MediosCobro(this.props.login.UserSession);
        this.props.recven.List_medios_cobro(medios);
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
        const { recven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => (
            <>
              {option.label}
              <br />
              <TextField
                required
                id={option.value}
                placeholder='Importe'
                variant='outlined'
                margin='normal'
                type='input'
                value={option.saldo}
                onChange={this.handleChangeImporte()}
              />
              <br />
            </>
          ));
        }
        return (
          <Paper className={style.paper}>
            <div>{medios}</div>
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep2;
