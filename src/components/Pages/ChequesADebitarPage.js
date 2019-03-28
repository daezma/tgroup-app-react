import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../../api/itrisApiConnect';
import AdvanceTable from '../../ui/AdvanceTable';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const ChequesADebitarPage = inject('login', 'cheques_debitar')(
  observer(
    class ChequesADebitarPage extends Component {
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
      summaryGroup = [{ columnName: 'importe', type: 'sum' }];

      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login, cheques_debitar } = this.props;
          this.setState({ loading: true });
          const res = await itsGetClass(login.UserSession, 'ERP_CHE_DIF', login.User, 100);
          this.props.resetTimeout();
          this.setState({ loading: false });
          if (typeof res === 'string') {
            cheques_debitar.SetData(null);
            cheques_debitar.SetMsgAlert(res);
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
            cheques_debitar.SetData(rows);
          }
        } catch (error) {
          this.setState({ loading: false });
          console.log(error);
        }
      };

      getRowId = row => `${row.empresa}_${row.numero}`;

      onSelection = selection => {
        const { cheques_debitar } = this.props;
        let saldo = 0;
        cheques_debitar.Data.filter(
          row => selection.findIndex(selectId => selectId === this.getRowId(row)) !== -1
        ).forEach(row => (saldo += row.importe));
        cheques_debitar.SetSaldoImp(saldo);
        cheques_debitar.SetSelection(selection);
      };

      render() {
        const { cheques_debitar } = this.props;
        return (
          <div>
            {this.state.loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
            {cheques_debitar.Data ? (
              <AdvanceTable
                data={cheques_debitar.Data}
                columns={this.columns}
                getRowId={this.getRowId}
                currencyColumns={this.currencyColumns}
                ordering={this.ordering}
                grouping={this.grouping}
                summaryGroup={this.summaryGroup}
                summaryTotal={this.summaryTotal}
                strictGrouping
                noselect
              />
            ) : (
              cheques_debitar.MsgAlert
            )}
          </div>
        );
      }
    }
  )
);

export default withRouter(ChequesADebitarPage);
