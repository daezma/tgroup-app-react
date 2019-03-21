import LoginStore from './LoginStore';
import MenuPrincipalStore from './MenuPrincipalStore';
import PenVen from './PenVen';
import PenCom from './PenCom';
import RecVenStore from './RecVenStore';
import ValoresStore from './ValoresStore';
import ChequesADebitarStore from './ChequesADebitarStore';
import ComTesStore from './ComTesStore';

export default {
  login: new LoginStore(),
  menuPrincipal: new MenuPrincipalStore(),
  penven: new PenVen(),
  recven: new RecVenStore(),
  pencom: new PenCom(),
  valores: new ValoresStore(),
  cheques_debitar: new ChequesADebitarStore(),
  comtes: new ComTesStore()
};
