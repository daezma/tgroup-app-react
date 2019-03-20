import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../../api/itrisApiConnect';
import AdvanceTable from '../../ui/AdvanceTable';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const ValoresCarteraPage = inject('login', 'valores')(
  observer(
    class ValoresCarteraPage extends Component {
      state = {
        loading: false
      };

      columns = [
        { name: 'empresa', title: 'Empresa' },
        { name: 'fecha', title: 'Fecha dep.' },
        { name: 'numero', title: 'Número' },
        { name: 'importe', title: 'Importe' },
        { name: 'banco', title: 'Banco' }
      ];

      currencyColumns = ['importe'];

      ordering = [{ columnName: 'empresa', direction: 'asc' }, { columnName: 'fecha', direction: 'asc' }];

      summaryTotal = [{ columnName: 'importe', type: 'sum' }];

      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login, valores } = this.props;
          this.setState({ loading: true });
          const res = await itsGetClass(login.UserSession, 'ERP_CHE_CAR', login.User, 100);
          this.setState({ loading: false });
          if (typeof res === 'string') {
            valores.SetData(null);
            valores.SetMsgAlert(res);
          } else {
            const rows = res.map(row => {
              return {
                empresa: row.FK_ERP_EMPRESAS,
                fecha: row.FEC_DEP,
                numero: row.NUMERO,
                importe: row.IMPORTE,
                banco: row.DES_BANCOS
              };
            });
            valores.SetData(rows);
          }
        } catch (error) {
          this.setState({ loading: false });
          console.log(error);
        }
      };

      getRowId = row => `${row.empresa}_${row.numero}`;

      onSelection = selection => {
        const { valores } = this.props;
        let saldo = 0;
        valores.Data.filter(row => selection.findIndex(selectId => selectId === this.getRowId(row)) !== -1).forEach(
          row => (saldo += row.importe)
        );
        valores.SetSaldoImp(saldo);
        valores.SetSelection(selection);
      };

      render() {
        const { valores } = this.props;
        return (
          <div>
            {this.state.loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
            {valores.Data ? (
              <AdvanceTable
                data={valores.Data}
                columns={this.columns}
                getRowId={this.getRowId}
                currencyColumns={this.currencyColumns}
                ordering={this.ordering}
                grouping={this.grouping}
                summaryGroup={this.summaryGroup}
                summaryTotal={this.summaryTotal}
                strictGrouping
                selection={valores.Selection}
                onSelection={this.onSelection}
              />
            ) : (
              valores.MsgAlert
            )}
          </div>
        );
      }
    }
  )
);

export default withRouter(ValoresCarteraPage);
