import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Paper } from '@material-ui/core';
import style from './RecVen.module.css';

const RecVenStep3 = inject('recven', 'penven')(
  observer(
    class RecVenStep3 extends Component {
      render() {
        const { recven, penven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => {
            let componente;
            if (option.saldo !== '') {
              componente = (
                <React.Fragment key={option.value}>
                  {`${option.label} $ ${parseFloat(option.saldo).toFixed(2)}`}
                  <br />
                </React.Fragment>
              );
            }
            return componente;
          });
        }
        return (
          <Paper className={style.paper}>
            <div>
              {`Fecha ${recven.fecha}`}
              <br />
              {`Empresa ${recven.fk_erp_empresas}`}
              <br />
              {`Detalle de cuentas`}
              <br />
              {medios}
              <br />
              {`Total $ ${(parseFloat(recven.saldo) + penven.SaldoImp).toFixed(2)}`}
            </div>
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep3;
