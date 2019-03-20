import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Paper } from '@material-ui/core';
import style from './ComTes.module.css';

const ComTesStep3 = inject('comtes')(
  observer(
    class ComTesStep3 extends Component {
      render() {
        const { comtes } = this.props;
        let medios;
        if (comtes.list_medios_cobro !== null) {
          medios = comtes.list_medios_cobro.map(option => {
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
              {`Fecha ${comtes.fecha}`}
              <br />
              {`Detalle de cuentas`}
              <br />
              {medios}
              <br />
              {`Total $ ${parseFloat(comtes.saldo).toFixed(2)}`}
            </div>
          </Paper>
        );
      }
    }
  )
);

export default ComTesStep3;
