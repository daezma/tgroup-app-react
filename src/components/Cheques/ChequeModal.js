import React, { Component } from 'react';
import { Modal, Paper, TextField, Button, FormGroup, FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { itsGetClassSimple } from '../../api/itrisApiConnect';

const ChequeModal = inject('recven', 'login')(
  observer(
    class ChequeModal extends Component {
      state = {
        bancos: []
      };

      cargarBancos = async () => {
        const { login } = this.props;
        const bancos = await itsGetClassSimple(login.UserSession, 'ERP_BANCOS');
        this.setState({ bancos: bancos });
      };

      changeData = valor => event => {
        const { recven } = this.props;
        //Hago esto para hacer el evento genérico y poder usar el parámetro de la funcion como índice
        var tmpArray = { ...recven.dataChequeModal };
        tmpArray[valor] = event.target.value;
        if (
          (valor === 'TIPO' && event.target.value === 'C') ||
          ((valor === 'FEC_DEP' || valor === 'FEC_EMI') && tmpArray['TIPO'] === 'C')
        ) {
          tmpArray['FEC_DEP'] = tmpArray['FEC_EMI'];
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
                  value={this.props.recven.dataChequeModal.FK_ERP_CUE_TES}
                  inputProps={{ readOnly: true }}
                />
                <p>{this.props.recven.dataChequeModal.descCuenta}</p>
                <TextField
                  required
                  id='cheque_banco'
                  select
                  label='Banco'
                  value={this.props.recven.dataChequeModal.FK_ERP_BANCOS}
                  onChange={this.changeData('FK_ERP_BANCOS')}
                  onClick={this.cargarBancos}
                >
                  {this.state.bancos.map(banco => (
                    <MenuItem key={banco.ID} value={banco.ID}>
                      {banco.DESCRIPCION}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  id='cheque_numero'
                  label='Numero'
                  value={this.props.recven.dataChequeModal.NUMERO2}
                  onChange={this.changeData('NUMERO2')}
                />
                <TextField
                  required
                  id='cheque_importe'
                  type='number'
                  label='Importe'
                  value={this.props.recven.dataChequeModal.IMPORTE}
                  onChange={this.changeData('IMPORTE')}
                />
                <TextField
                  required
                  id='cheque_tipo'
                  select
                  label='Tipo'
                  value={this.props.recven.dataChequeModal.TIPO}
                  margin='normal'
                  onChange={this.changeData('TIPO')}
                >
                  <MenuItem value='C'>Común</MenuItem>
                  <MenuItem value='D'>Diferido</MenuItem>
                </TextField>
                <TextField
                  required
                  id='cheque_origen'
                  select
                  label='Origen'
                  value={this.props.recven.dataChequeModal.ORIGEN}
                  margin='normal'
                  onChange={this.changeData('ORIGEN')}
                >
                  <MenuItem value='C'>Cliente</MenuItem>
                  <MenuItem value='T'>Tercero</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.recven.dataChequeModal.NO_ALAORDEN}
                      value='true'
                      onChange={this.changeData('NO_ALAORDEN')}
                    />
                  }
                  label='No a la orden'
                />
                <TextField
                  label='Fecha de emisión'
                  type='date'
                  value={this.props.recven.dataChequeModal.FEC_EMI}
                  onChange={this.changeData('FEC_EMI')}
                />
                <TextField
                  label='Fecha de depósito'
                  type='date'
                  value={this.props.recven.dataChequeModal.FEC_DEP}
                  onChange={this.changeData('FEC_DEP')}
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
