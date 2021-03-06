import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const MenuPrinicipalItem = ({ title, click, children }) => {
  return (
    <ListItem button onClick={click}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default MenuPrinicipalItem;
