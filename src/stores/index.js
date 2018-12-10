import LoginStore from './LoginStore';
import MenuPrincipalStore from './MenuPrincipalStore';
import PenVen from './PenVen';
import RecVenStore from './RecVenStore';

export default {
  login: new LoginStore(),
  menuPrincipal: new MenuPrincipalStore(),
  penven: new PenVen(),
  recven: new RecVenStore()
};
