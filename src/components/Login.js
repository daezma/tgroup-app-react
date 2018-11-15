import React, { Component } from 'react';
//import PropTypes from 'prop-types'
//import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';
import { Button, TextField, MenuItem, Paper } from '@material-ui/core';
import Img from 'react-image';
import logo from '../image/isologo.jpg';
import DialogError from '.';

class Login extends Component {
  constructor(props) {
    super(props);
    //const { user, pass } = props;

    this.state = {
      user: '',
      pass: '',
      open: false,
      base: '',
      msgErr: ''
    };
  }

  handleClickOpen = () => {
    //this.setState({ open: true });
    if (this.user == '') {
      this.setState({ open: true });
    }
    this.props.history.push('/home');
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const bases = [
      {
        value: 'PRUEBA',
        label: 'Prueba'
      }
    ];

    return (
      <Paper className='paper'>
        <div>
          <Img src={logo} />
          <br />
          <TextField
            required
            id='user'
            autoFocus='true'
            label='Usuario'
            variant='outlined'
            margin='normal'
            value={this.state.user}
            onChange={this.handleChange('user')}
          />
          <br />
          <TextField
            id='password'
            label='Contraseña'
            type='password'
            margin='normal'
            variant='outlined'
            value={this.state.pass}
            onChange={this.handleChange('pass')}
          />
          <br />
          <TextField
            required
            id='standard-select-currency'
            select
            label='Base'
            className='menu'
            value={this.state.base}
            onChange={this.handleChange('base')}
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
        </div>
      </Paper>
    );
  }
}

export default Login;
