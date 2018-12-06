import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { itsGetClass } from '../api/itrisApiConnect';
import AdvanceTable from '../ui/AdvanceTable';

const PenVenPage = inject('login', 'penven')(
  observer(
    class PenVenPage extends Component {
      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login, penven } = this.props;
          const res = await itsGetClass(login.UserSession, 'ERP_PEN_VEN_IMP', login.User);
          if (typeof res === 'string') {
            penven.SetMsgAlert(res);
          } else penven.SetData(res);
        } catch (error) {
          console.log(error);
        }
      };

      render() {
        const { penven } = this.props;
        return <div>{penven.Data ? <AdvanceTable data={penven.Data} /> : penven.MsgAlert}</div>;
      }
    }
  )
);

export default PenVenPage;
