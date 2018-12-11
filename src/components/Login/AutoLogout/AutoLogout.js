import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { itsLogout } from '../../../api/itrisApiConnect';

const AutoLogout = Clase =>
  inject('login')(
    observer(
      withRouter(
        class extends Component {
          componentDidMount() {
            this.startTimeout();
          }

          startTimeout = () => {
            this.props.login.setWarnTimeout(setTimeout(this.warn, 10 * 60 * 1000));
            this.props.login.setLogoutTimeout(setTimeout(this.logout, 11 * 60 * 1000));
          };

          resetTimeout = () => {
            if (this.props.login.WarnTimeout) clearTimeout(this.props.login.WarnTimeout);
            if (this.props.login.LogoutTimeout) clearTimeout(this.props.login.LogoutTimeout);
            this.startTimeout();
          };

          warn = () => {
            window.alert('Será deslogueado próximamente si no realiza alguna acción.');
          };

          logout = async () => {
            try {
              await itsLogout(this.props.login.UserSession);
            } catch (error) {
              console.log(error);
            }
            this.props.login.ClearSession();
            this.props.history.push('/login');
          };

          render() {
            return (
              <>
                <Clase {...this.props} />
              </>
            );
          }
        }
      )
    )
  );

export default AutoLogout;
