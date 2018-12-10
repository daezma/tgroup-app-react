import React from 'react';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export default class ResultadoBusqueda extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    return (
      <div>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>{this.props.titulo}</DialogTitle>
          <List>
            {this.props.values.map(descripcion => (
              <ListItem button onClick={() => this.handleListItemClick(descripcion)} key={descripcion}>
                <ListItemText primary={descripcion} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancelar
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResultadoBusqueda.propTypes = {
  tabla: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired
};
