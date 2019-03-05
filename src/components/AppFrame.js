import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';
import { withRouter, Redirect } from 'react-router-dom';
import InitPage from './InitPage';
import { observer, inject } from 'mobx-react';
import * as paginas from '../constants/paginas';
import Img from 'react-image';
import logo from '../image/TgroupLogo1.png';
const PenVenPage = React.lazy(() => import('./PenVenPage'));
const PenComPage = React.lazy(() => import('./PenComPage'));
const RecVen = React.lazy(() => import('./Recibos/RecVen'));

const AppFrame = inject('login')(
  observer(
    class AppFrame extends Component {
      SessionOk = () => {
        const { login } = this.props;
        if (login.UserSession === '') {
          return <Redirect to={paginas.LOGIN} />;
        }
      };

      render() {
        const { clase } = this.props;
        const contenido = (() => {
          switch (clase) {
            case paginas.PAGINA_EN_BLANCO:
              return <InitPage />;
            case paginas.PENDIENTES_VENTAS:
              return <PenVenPage />;
            case paginas.RECIBOS_VENTAS:
              return <RecVen />;
            case paginas.PENDIENTES_COMPRAS:
              return <PenComPage />;
            default:
              break;
          }
        })();

        return (
          <>
            {this.SessionOk()}
            <div>
              <div className='app-frame'>
                <MenuAppBar />
                <div>
                  <Suspense fallback='Cargando...'>{contenido}</Suspense>
                </div>
                <div>
                  <Img src={logo} height='170px' />
                </div>
              </div>
            </div>
          </>
        );
      }
    }
  )
);

AppFrame.propTypes = {
  body: PropTypes.element
};

export default withRouter(AppFrame);
