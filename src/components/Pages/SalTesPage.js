import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../../api/itrisApiConnect';
import AdvanceTable from '../../ui/AdvanceTable';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const SalTesPage = inject('login')(
  observer(
    class SalTesPage extends Component {
      state = {
        loading: false,
        msgAlert: '',
        data: [],
        saldoImp: 0
      };

      columns = [
        { name: 'cuenta', title: 'Cuenta' },
        { name: 'cuentadesc', title: 'Cuenta desc.' },
        { name: 'unineg', title: 'Uni. neg.' },
        { name: 'saldo', title: 'Saldo' }
      ];

      currencyColumns = ['saldo'];

      ordering = [{ columnName: 'cuentadesc', direction: 'asc' }];

      summaryTotal = [{ columnName: 'saldo', type: 'sum' }];

      summaryGroup = [{ columnName: 'saldo', type: 'sum' }];
      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login } = this.props;
          this.setState({ loading: true });
          const res = await itsGetClass(login.UserSession, '_TDI_SAL_TES', login.User, 100);
          this.setState({ loading: false });
          //Si esta OK trae un array sino string
          if (typeof res === 'string') {
            this.setState({ loading: false, data: [], msgAlert: res });
          } else {
            const rows = res.map(row => {
              return {
                cuenta: row.CUENTA_DH,
                cuentadesc: row.DESC_CUENTA,
                unineg: row.Z_FK_ERP_UNI_NEG,
                saldo: row.IMP
              };
            });
            this.setState({ data: rows, msgAlert: '' });
          }
        } catch (error) {
          this.setState({ loading: false, data: [], msgAlert: error });
        }
      };

      getRowId = row => `${row.cuenta}_${row.unineg}`;

      render() {
        return (
          <div>
            {this.state.loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : null}
            {this.state.data.length ? (
              <AdvanceTable
                data={this.state.data}
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
              this.state.msgAlert
            )}
          </div>
        );
      }
    }
  )
);

export default withRouter(SalTesPage);
