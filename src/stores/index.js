import LoginStore from './LoginStore';
import MenuPrincipalStore from './MenuPrincipalStore';
import PenVen from './PenVen';

export default {
  login: new LoginStore(),
  menuPrincipal: new MenuPrincipalStore(),
  penven: new PenVen()
};
