import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../../api/itrisApiConnect';
import AdvanceTable from '../../ui/AdvanceTable';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const SalTesPageNoUN = inject('login')(
  observer(
    class SalTesPageNoUN extends Component {
      state = {
        loading: false,
        msgAlert: '',
        data: [],
        saldoImp: 0
      };

      columns = [
        { name: 'cuenta', title: 'Cuenta' },
        { name: 'cuentadesc', title: 'Cuenta desc.' },
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
          this.props.resetTimeout();
          this.setState({ loading: false });
          //Si esta OK trae un array sino string
          if (typeof res === 'string') {
            this.setState({ loading: false, data: [], msgAlert: res });
          } else {
            let dataTmp = [];
            res.forEach(element => {
              //Si no está en el array agrego el objeto de esa cuenta
              if (dataTmp[element.CUENTA_DH] === undefined) {
                dataTmp[element.CUENTA_DH] = {
                  cuenta: element.CUENTA_DH,
                  cuentadesc: element.DESC_CUENTA,
                  saldo: element.IMP
                };
              } else {
                //Si está, le sumo el saldo de esta unidad de negocio
                dataTmp[element.CUENTA_DH] = {
                  ...dataTmp[element.CUENTA_DH],
                  saldo: dataTmp[element.CUENTA_DH].saldo + element.IMP
                };
              }
            });
            //Recorro el array y devuelvo un objeto que contiene un objeto por cada cuenta
            const data = dataTmp.map(e => {
              return { ...e };
            });
            this.setState({ data: data, msgAlert: '' });
          }
        } catch (error) {
          this.setState({ loading: false, data: [], msgAlert: error });
        }
      };

      getRowId = row => `${row.cuenta}`;

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

export default withRouter(SalTesPageNoUN);
