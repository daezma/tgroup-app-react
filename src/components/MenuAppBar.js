import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/core/Menu';
import { observer, inject } from 'mobx-react';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const MenuAppBar = inject('menuPrincipal')(
  observer(
    class MenuAppBar extends Component {
      constructor(props) {
        super(props);
        const { menuPrincipal } = this.props;
        menuPrincipal.UpdateAnchor(null);
        menuPrincipal.UpdateAnchorLogin(null);
      }
      state = {
        anchorEl: null
      };

      handleMenu = event => {
        const { menuPrincipal } = this.props;
        menuPrincipal.UpdateAnchorLogin(event.currentTarget);
      };

      handleClose = () => {
        const { menuPrincipal } = this.props;
        menuPrincipal.UpdateAnchorLogin(null);
      };

      handleCloseP = () => {
        const { menuPrincipal } = this.props;
        menuPrincipal.UpdateAnchor(null);
      };

      handleMenuP = event => {
        const { menuPrincipal } = this.props;
        menuPrincipal.UpdateAnchor(event.currentTarget);
      };

      render() {
        const { classes } = this.props;
        const { menuPrincipal } = this.props;

        return (
          <div className={classes.root}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  aria-owns={menuPrincipal.Open ? 'menu-appbar' : null}
                  aria-haspopup='true'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='Menu'
                  onClick={this.handleMenuP}
                >
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
                    onClose={this.handleCloseP}
                  >
                    <MenuItem onClick={this.handleCloseP}>Pendientes de imputación de ventas</MenuItem>
                    <MenuItem onClick={this.handleCloseP}>Recibos de ventas</MenuItem>
                  </MenuIcon>
                </IconButton>
                <Typography useNextVariants='true' variant='h6' color='inherit' className={classes.grow}>
                  Tgroup App
                </Typography>
                <div>
                  <IconButton
                    aria-owns={menuPrincipal.OpenLogin ? 'login-appbar' : null}
                    aria-haspopup='true'
                    onClick={this.handleMenu}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id='login-appbar'
                    anchorEl={menuPrincipal.AnchorLogin}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={menuPrincipal.OpenLogin}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Perfil</MenuItem>
                    <MenuItem onClick={this.handleClose}>Mi cuenta</MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        );
      }
    }
  )
);

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
