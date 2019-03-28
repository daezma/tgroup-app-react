import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../../api/itrisApiConnect';
import AdvanceTable from '../../ui/AdvanceTable';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const PenComPage = inject('login', 'pencom')(
  observer(
    class PenComPage extends Component {
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
          const { login, pencom } = this.props;
          this.setState({ loading: true });
          const res = await itsGetClass(login.UserSession, 'ERP_PEN_COM_IMP', login.User, 100);
          this.setState({ loading: false });
          if (typeof res === 'string') {
            pencom.SetData(null);
            pencom.SetMsgAlert(res);
          } else {
            const rows = res.map(row => {
              return {
                empresa: row.FK_ERP_EMPRESAS,
                fecha: row.FECHA,
                numero: row.FK_ERP_COM_COM,
                importe: row.IMPORTE * -1,
                saldo: row.SALDO * -1
              };
            });
            pencom.SetData(rows);
          }
        } catch (error) {
          this.setState({ loading: false });
          console.log(error);
        }
      };

      getRowId = row => `${row.empresa}_${row.numero}`;

      onSelection = selection => {
        const { pencom } = this.props;
        let saldo = 0;
        pencom.Data.filter(row => selection.findIndex(selectId => selectId === this.getRowId(row)) !== -1).forEach(
          row => (saldo += row.saldo)
        );
        pencom.SetSaldoImp(saldo);
        pencom.SetSelection(selection);
      };

      render() {
        const { pencom } = this.props;
        return (
          <div>
            {this.state.loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
            {pencom.Data ? (
              <AdvanceTable
                data={pencom.Data}
                columns={this.columns}
                getRowId={this.getRowId}
                currencyColumns={this.currencyColumns}
                ordering={this.ordering}
                grouping={this.grouping}
                summaryGroup={this.summaryGroup}
                summaryTotal={this.summaryTotal}
                strictGrouping
                selection={pencom.Selection}
                onSelection={this.onSelection}
                invertColors
              />
            ) : (
              pencom.MsgAlert
            )}
          </div>
        );
      }
    }
  )
);

export default withRouter(PenComPage);
