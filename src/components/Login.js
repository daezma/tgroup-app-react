import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';
import { Button, TextField, MenuItem, Paper } from '@material-ui/core';
import Img from 'react-image';
import logo from '../image/isologo.jpg';
import DialogError from '../ui/DialogError';
import { itsLogin } from '../api/itrisApiConnect';
import { observer, inject } from 'mobx-react';
import { bases } from '../constants/bases';

@inject('login')
@observer
class Login extends Component {
  handleClickOpen = async () => {
    const { login } = this.props;
    if (login.User === '') {
      login.updateValue(true, 'O');
      login.updateValue('El campo Usuario debe contener un valor', 'M');
      login.updateValue(false, 'X');
    } else if (login.Base === '') {
      login.updateValue(true, 'O');
      login.updateValue('El campo Base debe contener un valor', 'M');
      login.updateValue(false, 'X');
    } else {
      login.updateValue(true, 'X');
      const response = await itsLogin(login.Base, login.User, login.Pass);
      login.updateValue(response, 'L');
      if (login.UserSession !== '') this.props.history.push('/penven');
      else {
        login.updateValue(true, 'O');
        login.updateValue(response.msgError, 'M');
        login.updateValue(false, 'X');
      }
    }
  };

  handleClose = () => {
    const { login } = this.props;
    login.updateValue(false, 'O');
  };

  handleChange = option => event => {
    const { login } = this.props;
    login.updateValue(event.target.value, option);
  };

  render() {
    const { login } = this.props;

    return (
      <Paper className='paper'>
        <div>
          <Img src={logo} />
          <br />
          {login.loading ? (
            <>
              <Button disabled>Login</Button>
              <CircularProgress />
            </>
          ) : (
            <>
              <TextField
                required
                id='user'
                autoFocus={true}
                label='Usuario'
                variant='outlined'
                margin='normal'
                value={login.User}
                onChange={this.handleChange('U')}
              />
              <br />
              <TextField
                id='password'
                label='Contraseña'
                type='password'
                margin='normal'
                variant='outlined'
                value={login.Pass}
                onChange={this.handleChange('P')}
              />
              <br />
              <TextField
                required
                id='standard-select-currency'
                select
                label='Base'
                className='menu'
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
          <DialogError open={login.openDialogState} handleClose={this.handleClose} msgError={login.msgErrorData} />
        </div>
      </Paper>
    );
  }
}

export default Login;
