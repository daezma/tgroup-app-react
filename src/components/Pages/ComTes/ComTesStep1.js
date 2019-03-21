import React, { Component } from 'react';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import style from './ComTes.module.css';
import { observer, inject } from 'mobx-react';
import { fk_erp_uni_neg } from '../../../api/ListasFijas';
import { itsGetClassSimple } from '../../../api/itrisApiConnect';

const ComTesStep1 = inject('comtes', 'login')(
  observer(
    class ComTesStep1 extends Component {
      componentDidMount = () => {
        this.CargarListas();
      };

      CargarListas = async () => {
        try {
          const { login, comtes } = this.props;
          const uniNeg = await fk_erp_uni_neg(login.UserSession);
          //TODO: AGREGAR LA CONSULTA DE CUENTAS
          const conceptos = await itsGetClassSimple(login.UserSession, 'ERP_CUE_TES', "isnull(_TIPO_WEB, '') <> ''");
          comtes.List_uni_neg(uniNeg);
          comtes.List_conceptos(conceptos);
        } catch (error) {
          console.log('error:' + error);
        }
      };

      handleChange = tipo => event => {
        const { comtes } = this.props;
        switch (tipo) {
          case 'F':
            comtes.Fecha(event.target.value);
            break;
          case 'U':
            comtes.Fk_erp_uni_neg(event.target.value);
            break;
          case 'I':
            comtes.Saldo(event.target.value);
            break;
          case 'O':
            comtes.Observaciones(event.target.value);
            break;
          case 'T':
            comtes.Tipo(event.target.value);
            comtes.Concepto('');
            break;
          case 'C':
            comtes.Concepto(event.target.value);
            break;
          default:
            break;
        }
      };

      render() {
        const { comtes } = this.props;
        const unidad = comtes.list_uni_neg.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ));

        const conceptos = comtes.list_conceptos
          .filter(cuenta => cuenta._TIPO_WEB === comtes.tipo)
          .map(cuenta => (
            <MenuItem key={cuenta.ID} value={cuenta.ID}>
              {cuenta.DESCRIPCION}
            </MenuItem>
          ));

        return (
          <Paper className={style.paper}>
            <div>
              <p>Datos del comprobante:</p>
              <TextField
                required
                id='fecha'
                placeholder='Fecha'
                variant='outlined'
                margin='normal'
                type='date'
                value={comtes.fecha}
                onChange={this.handleChange('F')}
              />
              <br />
              <TextField
                required
                id='saldo'
                variant='outlined'
                margin='normal'
                type='number'
                label='Importe'
                value={comtes.saldo}
                onChange={this.handleChange('I')}
              />
              <br />
              <TextField
                required
                id='fk_erp_uni_neg'
                select
                label='Unidad de negocio'
                variant='outlined'
                className={style.menu}
                value={comtes.fk_erp_uni_neg}
                onChange={this.handleChange('U')}
                margin='normal'
              >
                {unidad}
              </TextField>
              <br />
              <TextField
                required
                id='tipo'
                select
                label='Tipo'
                variant='outlined'
                value={comtes.tipo}
                className={style.menu}
                margin='normal'
                onChange={this.handleChange('T')}
              >
                <MenuItem value='I'>Ingreso</MenuItem>
                <MenuItem value='E'>Egreso</MenuItem>
              </TextField>
              <br />
              <TextField
                required
                id='concepto'
                select
                label='Concepto'
                variant='outlined'
                value={comtes.concepto}
                className={style.menu}
                onChange={this.handleChange('C')}
                margin='normal'
              >
                {conceptos}
              </TextField>
              <br />
              <TextField
                id='observaciones'
                label='Observaciones'
                variant='outlined'
                margin='normal'
                value={comtes.observaciones}
                multiline
                onChange={this.handleChange('O')}
              />
            </div>
          </Paper>
        );
      }
    }
  )
);

export default ComTesStep1;
