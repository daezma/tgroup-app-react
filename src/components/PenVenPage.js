import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SimpleTable from '../ui/SimpleTable';
import { itsGetClass } from '../api/itrisApiConnect';

const PenVenPage = inject('login')(
  observer(
    class PenVenPage extends Component {
      traerDatos = async () => {
        const { login } = this.props;
        return await itsGetClass(login.UserSession, 'ERP_PEN_VEN_IMP');
      };

      render() {
        const objeto = this.traerDatos();
        console.log(objeto);
        return (
          <div>
            <SimpleTable objeto={objeto} />
          </div>
        );
      }
    }
  )
);

export default PenVenPage;
