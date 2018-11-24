import React, { Component } from 'react';
import { MenuIcon, MenuItem } from '@material-ui/core/Menu';
import { observer, inject } from 'mobx-react';

@inject('menuPrincipal')
@observer
class MenuPrincipal extends Component {
  //menuPrincipal = null;
  constructor(props) {
    super(props);
    //this.menuPrincipal = this.props;
  }

  handleClose = () => {
    const { menuPrincipal } = this.props;
    menuPrincipal.UpdateAnchor(null);
  };

  handleMenu = event => {
    const { menuPrincipal } = this.props;
    menuPrincipal.UpdateAnchor(event.currentTarget);
  };

  render() {
    const { menuPrincipal } = this.props;
    return (
      <div>
        <MenuIcon
          id='menu-appbar'
          anchorEl={menuPrincipal.Anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={menuPrincipal.Open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Pendientes de imputación de ventas</MenuItem>
          <MenuItem onClick={this.handleClose}>Recibos de ventas</MenuItem>
        </MenuIcon>
      </div>
    );
  }
}

export default MenuPrincipal;
