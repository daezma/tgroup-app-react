import React, { Component } from 'react';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import style from './RecVen.module.css';
import { observer, inject } from 'mobx-react';
import { fk_erp_uni_neg } from '../../api/ListasFijas';
import Buscador from '../../api/Buscadores';

const RecVenStep1 = inject('recven', 'login')(
  observer(
    class RecVenStep1 extends Component {
      componentDidMount = () => {
        this.CargarListas();
      };

      CargarListas = async () => {
        try {
          const uniNeg = await fk_erp_uni_neg(this.props.login.UserSession);
          this.props.recven.List_uni_neg(uniNeg);
        } catch (error) {
          console.log('error:' + error);
        }
      };

      handleChange = tipo => event => {
        switch (tipo) {
          case 'F':
            this.props.recven.Fecha(event.target.value);
            break;
          case 'U':
            this.props.recven.Fk_erp_uni_neg(event.target.value);
            break;
          case 'I':
            this.props.recven.Imp_total(event.target.value);
            break;
          case 'O':
            this.props.recven.Observaciones(event.target.value);
            break;
          default:
            break;
        }
      };

      //TODO: aqui cambiar, hacer cuando se pierda el foco o se apriete enter para que active el buscador
      handleEmpresa = () => event => {
        this.props.recven.Fk_erp_Empresas(event.target.value);
      };

      render() {
        const { recven } = this.props;
        const uniNeg = recven.list_uni_neg;
        let unidad;
        if (uniNeg !== null) {
          unidad = recven.list_uni_neg.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ));
        }
        return (
          <Paper className={style.paper}>
            <div>
              <TextField
                required
                id='fecha'
                placeholder='Fecha'
                variant='outlined'
                margin='normal'
                type='date'
                value={recven.fecha}
                onChange={this.handleChange('F')}
              />
              <br />
              <TextField
                required
                id='fk_erp_empresas'
                autoFocus={true}
                placeholder='Empresa'
                variant='outlined'
                margin='normal'
                value={recven.fk_erp_empresas}
                onChange={this.handleEmpresa()}
              />
              <br />
              <TextField
                required
                id='fk_erp_uni_neg'
                select
                label='Unidad de negocio'
                className={style.menu}
                value={recven.fk_erp_uni_neg}
                onChange={this.handleChange('U')}
                margin='normal'
              >
                {unidad}
              </TextField>
              <br />
              <TextField
                required
                id='importe'
                placeholder='Importe'
                variant='outlined'
                margin='normal'
                type='number'
                value={recven.imp_total}
                onChange={this.handleChange('I')}
              />
              <br />
              <TextField
                required
                id='observaciones'
                placeholder='Observaciones'
                variant='outlined'
                margin='normal'
                value={recven.observaciones}
                onChange={this.handleChange('O')}
              />
            </div>
          </Paper>
        );
      }
    }
  )
);

export default RecVenStep1;
