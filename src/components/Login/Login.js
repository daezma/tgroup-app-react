import React, { Component } from 'react';
import style from './Login.module.css';
import { Button, TextField, MenuItem, Paper } from '@material-ui/core';
import Img from 'react-image';
import logo from '../../image/isologo.jpg';
import DialogSnack from '../../ui/DialogSnack';
import { itsLogin } from '../../api/itrisApiConnect';
import { observer, inject } from 'mobx-react';
import { bases } from '../../constants/bases';
import { HOME } from '../../constants/paginas';

const Login = inject('login')(
  observer(
    class Login extends Component {
      handleClickOpen = async () => {
        const { login } = this.props;
        let error = '';
        if (login.User === '') {
          error = 'El campo Usuario debe contener un valor';
        } else if (login.Base === '') {
          error = 'El campo Base debe contener un valor';
        } else {
          login.setLoading(true);
          const response = await itsLogin(login.Base, login.User, login.Pass);
          login.setUserSession(response.usersession);
          if (login.UserSession !== '') {
            this.props.history.push(HOME);
          } else {
            error = response.msgError;
          }
        }
        if (error !== '') {
          login.setOpenDialog(true);
          login.setMsgError(error);
          login.setLoading(false);
        }
      };

      handleClose = () => {
        this.props.login.setOpenDialog(false);
      };

      handleChange = option => event => {
        switch (option) {
          case 'P':
            this.props.login.setPass(event.target.value);
            break;
          case 'B':
            this.props.login.setBase(event.target.value);
            break;
          default:
            break;
        }
      };

      handleChangeLogin = () => event => {
        this.props.login.setUser(event.target.value);
      };

      render() {
        const { login } = this.props;

        return (
          <Paper className={style.paper}>
            <div>
              <Img src={logo} className={login.loading ? style.image : null} />
              <br />
              {login.loading ? (
                <>
                  <p>Verificando...</p>
                </>
              ) : (
                <>
                  <TextField
                    required
                    id='user'
                    autoFocus={true}
                    placeholder='Usuario'
                    variant='outlined'
                    margin='normal'
                    value={login.User}
                    onChange={this.handleChangeLogin()}
                  />
                  <br />
                  <TextField
                    id='password'
                    placeholder='Contraseña'
                    type='password'
                    margin='normal'
                    variant='outlined'
                    value={login.Pass}
                    onChange={this.handleChange('P')}
                  />
                  <br />
                  <TextField
                    required
                    id='select-base'
                    select
                    label='Base'
                    className={style.menu}
                    value={login.Base}
                    onChange={this.handleChange('B')}
                    margin='normal'
                  >
                    {bases.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                    Login
                  </Button>
                </>
              )}

              <br />
              <DialogSnack open={login.openDialogState} handleClose={this.handleClose} msg={login.msgErrorData} />
            </div>
          </Paper>
        );
      }
    }
  )
);

export default Login;
