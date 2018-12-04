import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SimpleTable from '../ui/SimpleTable';
import { itsGetClass } from '../api/itrisApiConnect';

const PenVenPage = inject('login', 'penven')(
  observer(
    class PenVenPage extends Component {
      componentDidMount() {
        this.traerDatos();
      }

      traerDatos = async () => {
        try {
          const { login, penven } = this.props;
          const res = await itsGetClass(login.UserSession, 'ERP_PEN_VEN_IMP');
          penven.SetData(res);
        } catch (error) {
          console.log(error);
        }
      };

      render() {
        const { penven } = this.props;
        return <div>{penven.Data ? <SimpleTable objeto={penven.Data} /> : null}</div>;
      }
    }
  )
);

export default PenVenPage;
