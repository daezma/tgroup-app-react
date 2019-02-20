import React, { Component } from 'react';
import { Modal, Paper, TextField, Button, FormGroup, FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

const ChequeModal = inject('recven')(
  observer(
    class ChequeModal extends Component {
      changeData = valor => event => {
        const { recven } = this.props;
        //Hago esto para hacer el evento genérico y poder usar el parámetro de la funcion como índice
        var tmpArray = { ...recven.dataChequeModal };
        tmpArray[valor] = event.target.value;
        if (
          (valor === 'tipo' && event.target.value === 'C') ||
          ((valor === 'fecDep' || valor === 'fecEmi') && tmpArray['tipo'] === 'C')
        ) {
          tmpArray['fecDep'] = tmpArray['fecEmi'];
        }
        recven.DataChequeModal(tmpArray);
      };

      render() {
        return (
          <Modal open={this.props.open} onClose={this.props.onClose}>
            <Paper>
              <FormGroup>
                <TextField
                  required
                  id='cheque_cuenta'
                  label='Cuenta'
                  value={this.props.recven.dataChequeModal.cuenta}
                  inputProps={{ readOnly: true }}
                />
                <p>{this.props.recven.dataChequeModal.descCuenta}</p>
                <TextField
                  required
                  id='cheque_banco'
                  label='Banco'
                  value={this.props.recven.dataChequeModal.banco}
                  onChange={this.changeData('banco')}
                />
                <TextField
                  required
                  id='cheque_numero'
                  label='Numero'
                  value={this.props.recven.dataChequeModal.numero}
                  onChange={this.changeData('numero')}
                />
                <TextField
                  required
                  id='cheque_importe'
                  type='number'
                  label='Importe'
                  value={this.props.recven.dataChequeModal.importe}
                  onChange={this.changeData('importe')}
                />
                <TextField
                  required
                  id='cheque_tipo'
                  select
                  label='Tipo'
                  value={this.props.recven.dataChequeModal.tipo}
                  margin='normal'
                  onChange={this.changeData('tipo')}
                >
                  <MenuItem value='C'>Común</MenuItem>
                  <MenuItem value='D'>Diferido</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.recven.dataChequeModal.noALaOrden}
                      value='true'
                      onChange={this.changeData('noALaOrden')}
                    />
                  }
                  label='No a la orden'
                />
                <TextField
                  label='Fecha de emisión'
                  type='date'
                  value={this.props.recven.dataChequeModal.fecEmi}
                  onChange={this.changeData('fecEmi')}
                />
                <TextField
                  label='Fecha de depósito'
                  type='date'
                  value={this.props.recven.dataChequeModal.fecDep}
                  onChange={this.changeData('fecDep')}
                />
                <br />
                <Button onClick={this.props.aceptar}>Aceptar</Button>
                <Button onClick={this.props.onClose}>Cancelar</Button>
              </FormGroup>
            </Paper>
          </Modal>
        );
      }
    }
  )
);

export default ChequeModal;
