import React, { Component } from 'react';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import style from './RecVen.module.css';
import { observer, inject } from 'mobx-react';
import { fk_erp_uni_neg } from '../../api/ListasFijas';
import SelectAutocomplete from '../../ui/SelectAutocomplete';

const RecVenStep1 = inject('recven', 'login', 'penven')(
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
            this.props.recven.Saldo(event.target.value);
            break;
          case 'O':
            this.props.recven.Observaciones(event.target.value);
            break;
          default:
            break;
        }
      };

      //TODO: aqui cambiar, hacer cuando se pierda el foco o se apriete enter para que active el buscador
      handleEmpresa = empresa => {
        this.props.recven.Fk_erp_empresas(empresa);
      };

      render() {
        const { recven, penven } = this.props;
        const uniNeg = recven.list_uni_neg;
        let unidad;
        if (uniNeg !== '') {
          unidad = recven.list_uni_neg.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ));
        }

        const imputaciones = penven.Facturas ? (
          <div>
            <p>Imputaciones: </p>
            {penven.Facturas.map(value => {
              return <p key={value}>{value}</p>;
            })}
            <p>Importe imputado: ${penven.SaldoImp.toFixed(2)}</p>
          </div>
        ) : null;

        if (penven.EmpresaImputacion) {
          recven.Fk_erp_empresas(penven.EmpresaImputacion);
          recven.Empresa_props = {
            readOnly: true
          };
        }

        return (
          <Paper className={style.paper}>
            {imputaciones}
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
              <SelectAutocomplete
                value={recven.fk_erp_empresas}
                placeholder='Seleccione una empresa'
                clase='ERP_EMPRESAS'
                onChange={this.handleEmpresa}
                key={recven.fk_erp_empresas}
                campoFiltro='ID'
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
                id='saldo'
                placeholder='Saldo'
                variant='outlined'
                margin='normal'
                type='number'
                label='Importe a cuenta'
                value={recven.saldo}
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

export default RecVenStep1;
