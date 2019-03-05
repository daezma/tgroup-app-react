import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../api/itrisApiConnect';
import AdvanceTable from '../ui/AdvanceTable';
import Button from '@material-ui/core/Button';
import { RECIBOS_VENTAS } from '../constants/paginas';
import { withRouter } from 'react-router-dom';
import DialogSnack from '../ui/DialogSnack';
import { CircularProgress } from '@material-ui/core';

const PenVenPage = inject('login', 'penven')(
  observer(
    class PenVenPage extends Component {
      state = {
        loading: false
      };

      columns = [
        { name: 'empresa', title: 'Empresa' },
        { name: 'fecha', title: 'Fecha' },
        { name: 'numero', title: 'Número' },
        { name: 'importe', title: 'Importe' },
        { name: 'saldo', title: 'Saldo' }
      ];

      currencyColumns = ['importe', 'saldo'];

      ordering = [{ columnName: 'empresa', direction: 'asc' }, { columnName: 'importe', direction: 'asc' }];

      grouping = [{ columnName: 'empresa' }];

      summaryGroup = [{ columnName: 'saldo', type: 'sum' }];

      summaryTotal = [{ columnName: 'saldo', type: 'sum' }];

      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login, penven } = this.props;
          this.setState({ loading: true });
          const res = await itsGetClass(login.UserSession, 'ERP_PEN_VEN_IMP', login.User, 100);
          this.setState({ loading: false });
          if (typeof res === 'string') {
            penven.SetData(null);
            penven.SetMsgAlert(res);
          } else {
            const rows = res.map(row => {
              return {
                empresa: row.FK_ERP_EMPRESAS,
                fecha: row.FECHA,
                numero: row.FK_ERP_COM_VEN,
                importe: row.IMPORTE,
                saldo: row.SALDO
              };
            });
            penven.SetData(rows);
          }
        } catch (error) {
          this.setState({ loading: false });
          console.log(error);
        }
      };

      getRowId = row => `${row.empresa}_${row.numero}`;

      onSelection = selection => {
        const { penven } = this.props;
        let saldo = 0;
        penven.Data.filter(row => selection.findIndex(selectId => selectId === this.getRowId(row)) !== -1).forEach(
          row => (saldo += row.saldo)
        );
        penven.SetSaldoImp(saldo);
        penven.SetSelection(selection);
      };

      generarRecibo = () => {
        const { penven } = this.props;
        let empresasOk = false;
        let empresaSeleccionada = null;
        //El ID de la fila tiene el diseño EMPRESA_NROFACTURA
        //Valido que no se seleccionen 2 empresas diferentes
        if (penven.Selection.length > 0) {
          empresasOk = penven.Selection.map(value => {
            const seleccion = value.split('_');
            empresaSeleccionada = seleccion[0];
            return seleccion[0];
          }).every((val, i, arr) => val === arr[0]);
          if (empresasOk) {
            //Armo un nuevo estado solo con las facturas seleccionadas
            const facturas = penven.Selection.map(value => {
              const seleccion = value.split('_');
              const saldo = penven.Data.filter(row => value === this.getRowId(row))[0].saldo;
              return { ID: seleccion[1], saldo: saldo };
            });
            penven.SetFacturas(facturas);
            penven.SetEmpresaImputacion(empresaSeleccionada);
            this.props.history.push(RECIBOS_VENTAS);
          } else {
            penven.SetErrorRecibo('No puede seleccionar pendientes de empresas distintas');
          }
        } else {
          penven.SetErrorRecibo('Seleccione algún comprobante pendiente para generar el recibo');
        }
      };

      handleClose = () => {
        this.props.penven.SetErrorRecibo('');
      };

      render() {
        const { penven } = this.props;
        return (
          <div>
            {this.state.loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
            {penven.Data ? (
              <AdvanceTable
                data={penven.Data}
                columns={this.columns}
                getRowId={this.getRowId}
                currencyColumns={this.currencyColumns}
                ordering={this.ordering}
                grouping={this.grouping}
                summaryGroup={this.summaryGroup}
                summaryTotal={this.summaryTotal}
                strictGrouping
                selection={penven.Selection}
                onSelection={this.onSelection}
              />
            ) : (
              penven.MsgAlert
            )}
            <Button onClick={this.generarRecibo} variant='contained' color='primary'>
              Generar recibo
            </Button>
            <DialogSnack open={penven.ErrorRecibo !== ''} handleClose={this.handleClose} msg={penven.ErrorRecibo} />
          </div>
        );
      }
    }
  )
);

export default withRouter(PenVenPage);
