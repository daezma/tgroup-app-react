import React, { Component } from 'react';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Print from '@material-ui/icons/Print';
import Swap from '@material-ui/icons/SwapHoriz';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuPrinicipalItem from './MenuPrincipalItem/MenuPrincipalItem';
import * as paginas from '../../constants/paginas';
import { withRouter } from 'react-router-dom';

class MenuPrincipalItems extends Component {
  GoToPage = pagina => {
    this.props.onSelectedItem();
    this.props.history.push(pagina);
  };

  render() {
    return (
      <>
        <List subheader={<ListSubheader component='div'>Ventas</ListSubheader>}>
          <MenuPrinicipalItem title='Pendientes de imputación' click={() => this.GoToPage(paginas.PENDIENTES_VENTAS)}>
            <Print />
          </MenuPrinicipalItem>
          <MenuPrinicipalItem title='Recibos' click={() => this.GoToPage(paginas.RECIBOS_VENTAS)}>
            <AttachMoney />
          </MenuPrinicipalItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component='div'>Compras</ListSubheader>}>
          <MenuPrinicipalItem title='Pendientes de imputación' click={() => this.GoToPage(paginas.PENDIENTES_COMPRAS)}>
            <Print />
          </MenuPrinicipalItem>
        </List>
        <Divider />
        <List subheader={<ListSubheader component='div'>Tesorería</ListSubheader>}>
          <MenuPrinicipalItem title='Saldos de tesorería' click={() => this.GoToPage(paginas.SAL_TES)}>
            <Print />
          </MenuPrinicipalItem>
          <MenuPrinicipalItem title='Valores en cartera' click={() => this.GoToPage(paginas.VALORES)}>
            <Print />
          </MenuPrinicipalItem>
          <MenuPrinicipalItem title='Cheques a debitar' click={() => this.GoToPage(paginas.CHEQUES_A_DEBITAR)}>
            <Print />
          </MenuPrinicipalItem>
          <MenuPrinicipalItem title='Ingresos/Egresos' click={() => this.GoToPage(paginas.COMPROBANTES_TESORERIA)}>
            <Swap />
          </MenuPrinicipalItem>
        </List>
      </>
    );
  }
}

export default withRouter(MenuPrincipalItems);
