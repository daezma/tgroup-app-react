import React, { Component } from 'react';
import {
  Modal,
  Paper,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Grid,
  Select,
  Input
} from '@material-ui/core';
import DialogSnack from '../../ui/DialogSnack';
import { observer, inject } from 'mobx-react';
import { itsGetClassSimple } from '../../api/itrisApiConnect';
import style from './ChequeModal.module.css';

const ChequeModal = inject('recven', 'login')(
  observer(
    class ChequeModal extends Component {
      state = {
        bancos: [],
        chequeCargado: false,
        error: ''
      };

      cargarBancos = async () => {
        const { login } = this.props;
        const bancos = await itsGetClassSimple(login.UserSession, 'ERP_BANCOS');
        this.setState({ bancos: bancos });
      };

      getCheque = async () => {
        const { recven, login } = this.props;
        var tmpArray = { ...recven.dataChequeModal };
        if (tmpArray.NUMERO2 !== '' && tmpArray.FK_ERP_BANCOS !== '') {
          try {
            const cheque = await itsGetClassSimple(
              login.UserSession,
              'ERP_CHE_TER',
              `FK_ERP_BANCOS = ${tmpArray.FK_ERP_BANCOS} AND NUMERO2 = ${
                tmpArray.NUMERO2
              } AND isnull(ANULADO,0) = 0 AND isnull(FK_ERP_CUE_TES,0) = 0`
            );
            if (cheque.length > 0) {
              this.setState({ chequeCargado: true });
              tmpArray.IMPORTE = cheque[0].IMPORTE;
              const emi = new Date(cheque[0].FEC_EMI);
              const dep = new Date(cheque[0].FEC_DEP);
              tmpArray.FEC_EMI = `${emi.getFullYear()}-${emi
                .getMonth()
                .toString()
                .padStart(2, '0')}-${emi
                .getDay()
                .toString()
                .padStart(2, '0')}`;
              tmpArray.FEC_DEP = `${emi.getFullYear()}-${dep
                .getMonth()
                .toString()
                .padStart(2, '0')}-${dep
                .getDay()
                .toString()
                .padStart(2, '0')}`;
              tmpArray.NO_ALAORDEN = cheque[0].NO_ALAORDEN;
              tmpArray.TIPO = cheque[0].TIPO;
              tmpArray.FK_ERP_BANCOS = cheque[0].FK_ERP_BANCOS;
              tmpArray.NUMERO2 = cheque[0].NUMERO2;
              tmpArray.ORIGEN = cheque[0].ORIGEN;
              tmpArray.ID = cheque[0].ID;
              recven.DataChequeModal(tmpArray);
              this.props.aceptar();
            } else {
              this.setState({ chequeCargado: false });
              recven.DataChequeModal(tmpArray);
            }
          } catch (error) {
            this.setState({ chequeCargado: false, error: error });
          }
        } else recven.DataChequeModal(tmpArray);
      };

      changeData = valor => async event => {
        const { recven } = this.props;
        //Hago esto para hacer el evento genérico y poder usar el parámetro de la funcion como índice
        var tmpArray = { ...recven.dataChequeModal };
        tmpArray[valor] = event.target.value;
        if (
          (valor === 'TIPO' && event.target.value === 'C') ||
          ((valor === 'FEC_DEP' || valor === 'FEC_EMI') && tmpArray.TIPO === 'C')
        ) {
          tmpArray.FEC_DEP = tmpArray.FEC_EMI;
        }
        recven.DataChequeModal(tmpArray);
        if (valor === 'FK_ERP_BANCOS') {
          this.getCheque();
        }
      };

      render() {
        return (
          <Modal open={this.props.open} onClose={this.props.onClose}>
            <Paper className={style.paper}>
              <FormGroup>
                <Grid container spacing={8}>
                  <Grid item xm={6} xs={6}>
                    <TextField
                      required
                      id='cheque_cuenta'
                      label='Cuenta'
                      value={this.props.recven.dataChequeModal.FK_ERP_CUE_TES}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <p>{this.props.recven.dataChequeModal.descCuenta}</p>
                  </Grid>
                  <Grid item xm={12} xs={12}>
                    <Select
                      required
                      label='Banco'
                      value={this.props.recven.dataChequeModal.FK_ERP_BANCOS}
                      onChange={this.changeData('FK_ERP_BANCOS')}
                      onClick={this.cargarBancos}
                      className={style.fullInput}
                      input={<Input id='select-multiple-bancos' />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: '350px',
                            width: '300px'
                          }
                        }
                      }}
                    >
                      {this.state.bancos.map(banco => (
                        <MenuItem key={banco.ID} value={banco.ID}>
                          {banco.DESCRIPCION}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <TextField
                      required
                      id='cheque_numero'
                      label='Numero'
                      type='number'
                      value={this.props.recven.dataChequeModal.NUMERO2}
                      onChange={this.changeData('NUMERO2')}
                      onBlur={this.getCheque}
                      className={style.fullInput}
                    />
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <TextField
                      required
                      id='cheque_importe'
                      type='number'
                      label='Importe'
                      value={this.props.recven.dataChequeModal.IMPORTE}
                      onChange={this.changeData('IMPORTE')}
                    />
                  </Grid>
                  <Grid item xm={6} xs={6}>
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
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <TextField
                      required
                      id='cheque_origen'
                      select
                      label='Origen'
                      value={this.props.recven.dataChequeModal.ORIGEN}
                      margin='normal'
                      onChange={this.changeData('ORIGEN')}
                      className={style.fullInput}
                    >
                      <MenuItem value='C'>Cliente</MenuItem>
                      <MenuItem value='T'>Tercero</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xm={12} xs={12}>
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
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <p>Emisión</p>
                    <TextField
                      type='date'
                      value={this.props.recven.dataChequeModal.FEC_EMI}
                      onChange={this.changeData('FEC_EMI')}
                      className={style.fullInput}
                    />
                  </Grid>
                  <Grid item xm={6} xs={6}>
                    <p>Depósito</p>
                    <TextField
                      type='date'
                      value={this.props.recven.dataChequeModal.FEC_DEP}
                      onChange={this.changeData('FEC_DEP')}
                      className={style.fullInput}
                    />
                  </Grid>
                  <br />
                  <Grid item xm={3} xs={6}>
                    <Button color='primary' variant='contained' onClick={this.props.aceptar}>
                      Aceptar
                    </Button>
                  </Grid>
                  <Grid item xm={9} xs={6}>
                    <Button color='secondary' variant='contained' onClick={this.props.onClose}>
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </FormGroup>
              <DialogSnack
                open={this.state.error !== ''}
                handleClose={() => this.setState({ error: '' })}
                msg={this.state.error}
              />
            </Paper>
          </Modal>
        );
      }
    }
  )
);

export default ChequeModal;
