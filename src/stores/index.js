import LoginStore from './LoginStore';
import MenuPrincipalStore from './MenuPrincipalStore';

export default {
  login: new LoginStore(),
  menuPrincipal: new MenuPrincipalStore()
};
