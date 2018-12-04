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
          console.log(res.data);
          penven.setData(res.data);
        } catch (error) {
          console.log(error.data);
        }
      };

      render() {
        return (
          <div>
            <p>prueba</p>
          </div>
        );
      }
    }
  )
);

export default PenVenPage;
