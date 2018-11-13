import React, {Component} from 'react'
//import PropTypes from 'prop-types'
//import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';
import { Button, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from '@material-ui/core';

class Login extends Component {
  constructor(props) {
    super(props);
    //const { user, pass } = props;

    this.state = {
      user: null,
      pass: null,
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(){
    return(
    <div>
      <TextField id="user"
        autoFocus="true"
        label="Usuario"
        variant="outlined" 
        margin="normal"
        value={this.state.user}
      /> <br />
      <TextField
        id="password"
        label="Contraseña"
        type="password"
        margin="normal"
        variant="outlined"
        value={this.state.pass}
      /> <br />
      <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Prueba"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estamos probando
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok!
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }
}

export default Login;