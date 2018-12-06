import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { itsLogout } from '../api/itrisApiConnect';
import DialogSnack from '../ui/DialogSnack';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuPrincipalItems from './MenuPrincipalItems/MenuPrincipalItems';
import { LOGIN } from '../constants/paginas';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const MenuAppBar = inject('menuPrincipal', 'login')(
  observer(
    class MenuAppBar extends Component {
      constructor(props) {
        super(props);
        const { menuPrincipal } = this.props;
        menuPrincipal.SetAnchorLogin(null);
      }

      handleDrawerOpen = () => {
        const { menuPrincipal } = this.props;
        menuPrincipal.SetOpenMenu(true);
      };

      handleDrawerClose = () => {
        const { menuPrincipal } = this.props;
        menuPrincipal.SetOpenMenu(false);
      };

      handleMenu = event => {
        const { menuPrincipal } = this.props;
        menuPrincipal.SetAnchorLogin(event.currentTarget);
      };

      handleClose = () => {
        const { menuPrincipal } = this.props;
        menuPrincipal.SetAnchorLogin(null);
      };

      closeSession = async () => {
        const { login } = this.props;
        const response = await itsLogout(login.UserSession);
        if (response === '') {
          login.ClearSession();
          login.setLoading(false);
          this.props.history.push(LOGIN);
        } else {
          login.setOpenDialog(true);
          login.setMsgError(response);
          login.setLoading(false);
        }
      };

      render() {
        const { login, menuPrincipal, classes } = this.props;
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position='static'>
              <Toolbar disableGutters={!menuPrincipal.OpenMenu}>
                <IconButton
                  className={classes.menuButton}
                  aria-label='Menu'
                  color='inherit'
                  onClick={this.handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' className={classes.grow}>
                  Tgroup - Sistema Interno
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
                    <MenuItem onClick={this.closeSession}>Cerrar sesión</MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant='persistent'
              anchor='left'
              open={menuPrincipal.OpenMenu}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <MenuPrincipalItems />
            </Drawer>
            <DialogSnack open={login.openDialogState} handleClose={this.handleClose} msg={login.msgErrorData} />
          </div>
        );
      }
    }
  )
);

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MenuAppBar));
