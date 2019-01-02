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
        const { recven } = this.props;
        switch (tipo) {
          case 'F':
            recven.Fecha(event.target.value);
            break;
          case 'U':
            recven.Fk_erp_uni_neg(event.target.value);
            break;
          case 'I':
            recven.Saldo(event.target.value);
            break;
          case 'O':
            recven.Observaciones(event.target.value);
            break;
          default:
            break;
        }
      };

      handleEmpresa = empresa => {
        this.props.recven.Fk_erp_empresas(empresa);
      };

      //TODO: Validar que no se puede imputar un importe mayor al saldo del débito
      handleChangeImputacion = () => event => {
        const { penven } = this.props;
        const newFacturas = penven.Facturas.map(factura => {
          if (factura.ID === event.target.id) {
            return {
              saldo: +event.target.value,
              ID: factura.ID
            };
          } else return factura;
        });
        penven.SetFacturas(newFacturas);
        penven.SetSaldoImp(newFacturas.reduce((anterior, actual) => anterior + actual.saldo, 0));
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
            {penven.Facturas.map(factura => {
              return (
                <React.Fragment key={factura.ID}>
                  <TextField
                    required
                    id={factura.ID}
                    label={factura.ID}
                    variant='outlined'
                    margin='normal'
                    value={factura.saldo.toFixed(2)}
                    onChange={this.handleChangeImputacion()}
                  />
                </React.Fragment>
              );
            })}
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
              <p>Datos del recibo:</p>
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
              {penven.SaldoImp !== 0 ? (
                <TextField
                  required
                  id='fk_erp_empresas'
                  autoFocus={true}
                  placeholder='Empresa'
                  variant='outlined'
                  margin='normal'
                  value={recven.fk_erp_empresas}
                  onChange={this.handleEmpresa}
                  inputProps={this.empresa_props}
                />
              ) : (
                <SelectAutocomplete
                  value={recven.fk_erp_empresas}
                  placeholder='Seleccione una empresa'
                  clase='ERP_EMPRESAS'
                  onChange={this.handleEmpresa}
                  campoFiltro='ID'
                />
              )}
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
