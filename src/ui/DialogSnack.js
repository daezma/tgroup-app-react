import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const DialogSnack = ({ open, handleClose, msg }) => {
  const vertical = 'top';
  const horizontal = 'center';
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{msg}</span>}
        action={[
          <IconButton key='close' aria-label='Close' color='inherit' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

export default DialogSnack;
