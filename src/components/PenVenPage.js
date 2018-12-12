import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../api/itrisApiConnect';
import AdvanceTable from '../ui/AdvanceTable';
import Button from '@material-ui/core/Button';

const PenVenPage = inject('login', 'penven')(
  observer(
    class PenVenPage extends Component {
      columns = [
        { name: 'empresa', title: 'Empresa' },
        { name: 'fecha', title: 'Fecha' },
        { name: 'numero', title: 'Numero' },
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
          const res = await itsGetClass(login.UserSession, 'ERP_PEN_VEN_IMP', login.User);
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
          console.log(error);
        }
      };

      onSelection = selection => {
        const { penven } = this.props;
        penven.SetSelection(selection);
      };

      generarRecibo = () => {
        // const arraySeleccionados = this.props.penven.Selection.map(value => {
        //   seleccion = [...value].split('_');
        // });

        window.alert(this.props.penven.Selection);
      };

      render() {
        const { penven } = this.props;
        return (
          <div>
            {penven.Data ? (
              <AdvanceTable
                data={penven.Data}
                columns={this.columns}
                getRowId={row => `${row.empresa}_${row.numero}`}
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
          </div>
        );
      }
    }
  )
);

export default PenVenPage;
