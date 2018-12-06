import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import AppFrame from './components/AppFrame';
import { Provider } from 'mobx-react';
import stores from './stores';
import * as paginas from './constants/paginas';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path={paginas.LOGIN} component={Login} />
              <Route
                exact
                path={paginas.PENDIENTES_VENTAS}
                render={() => <AppFrame clase={paginas.PENDIENTES_VENTAS} />}
              />
              <Route exact path={paginas.RECIBOS_VENTAS} render={() => <AppFrame clase={paginas.RECIBOS_VENTAS} />} />
              <Route path={paginas.HOME} render={() => <AppFrame clase={paginas.PAGINA_EN_BLANCO} />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
