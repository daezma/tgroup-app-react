import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Paper } from '@material-ui/core';
import style from './RecVen.module.css';

const RecVenStep3 = inject('recven')(
  observer(
    class RecVenStep3 extends Component {
      render() {
        const { recven } = this.props;
        let medios;
        if (recven.list_medios_cobro !== null) {
          medios = recven.list_medios_cobro.map(option => {
            let componente;
            if (option.saldo !== null) {
              componente = (
                <>
                  {`${option.label} $ ${option.saldo}`}
                  <br />
                </>
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
              {`Total $ ${recven.imp_total}`}
            </div>
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep3;
