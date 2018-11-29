import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';
import { withRouter, Redirect } from 'react-router-dom';
import InitPage from './InitPage';
import { observer, inject } from 'mobx-react';
import * as paginas from '../constants/paginas';

const AppFrame = inject('login')(
  observer(
    class AppFrame extends Component {
      SessionOk = () => {
        const { login } = this.props;
        console.log('sesion' + login.UserSession);
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
                <div>{contenido}</div>
                <div>
                  <p>Tgroup Sistemas</p>
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
