import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../api/itrisApiConnect';
import AdvanceTable from '../ui/AdvanceTable';

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

      render() {
        const { penven } = this.props;
        return (
          <div>
            {penven.Data ? (
              <AdvanceTable
                data={penven.Data}
                columns={this.columns}
                currencyColumns={this.currencyColumns}
                ordering={this.ordering}
                grouping={this.grouping}
                summaryGroup={this.summaryGroup}
                summaryTotal={this.summaryTotal}
                strictGrouping
              />
            ) : (
              penven.MsgAlert
            )}
          </div>
        );
      }
    }
  )
);

export default PenVenPage;
