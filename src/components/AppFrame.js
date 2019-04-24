import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';
import { withRouter, Redirect } from 'react-router-dom';
import InitPage from './Pages/InitPage';
import { observer, inject } from 'mobx-react';
import * as paginas from '../constants/paginas';
import Img from 'react-image';
import logo from '../image/TgroupLogo1.png';
import SalTesPageSinUN from './Pages/SalTesPageSinUN';
const PenVenPage = React.lazy(() => import('./Pages/PenVenPage'));
const PenComPage = React.lazy(() => import('./Pages/PenComPage'));
const ValoresCarteraPage = React.lazy(() => import('./Pages/ValoresCarteraPage'));
const ChequesADebitarPage = React.lazy(() => import('./Pages/ChequesADebitarPage'));
const ComTesPage = React.lazy(() => import('./Pages/ComTes/ComTes'));
const SalTesPage = React.lazy(() => import('./Pages/SalTesPage'));
const RecVen = React.lazy(() => import('./Pages/Recibos/RecVen'));

const AppFrame = inject('login')(
  observer(
    class AppFrame extends Component {
      SessionOk = () => {
        if (!sessionStorage.usersession) {
          return <Redirect to={paginas.LOGIN} />;
        }
      };

      render() {
        const { clase, resetTimeout } = this.props;
        const contenido = (() => {
          switch (clase) {
            case paginas.PAGINA_EN_BLANCO:
              return <InitPage resetTimeout={resetTimeout} />;
            case paginas.PENDIENTES_VENTAS:
              return <PenVenPage resetTimeout={resetTimeout} />;
            case paginas.RECIBOS_VENTAS:
              return <RecVen resetTimeout={resetTimeout} />;
            case paginas.PENDIENTES_COMPRAS:
              return <PenComPage resetTimeout={resetTimeout} />;
            case paginas.VALORES:
              return <ValoresCarteraPage resetTimeout={resetTimeout} />;
            case paginas.CHEQUES_A_DEBITAR:
              return <ChequesADebitarPage resetTimeout={resetTimeout} />;
            case paginas.COMPROBANTES_TESORERIA:
              return <ComTesPage resetTimeout={resetTimeout} />;
            case paginas.SAL_TES:
              return <SalTesPage resetTimeout={resetTimeout} />;
            case paginas.SAL_TES_NO_UN:
              return <SalTesPageSinUN resetTimeout={resetTimeout} />;
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
