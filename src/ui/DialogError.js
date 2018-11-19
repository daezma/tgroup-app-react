import React from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';

const DialogError = ({ open, handleClose, msgError }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Atención'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{msgError}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogError.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  msgError: PropTypes.string.isRequired
};

export default DialogError;
