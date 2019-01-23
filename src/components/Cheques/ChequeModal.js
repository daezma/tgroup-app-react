import React from 'react';
import { Modal, Paper, TextField } from '@material-ui/core';
const ChequeModal = props => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Paper>
        <TextField label='Cuenta' value={props.cuenta} /> <p>{props.cuentaDesc}</p>
      </Paper>
    </Modal>
  );
};

export default ChequeModal;
