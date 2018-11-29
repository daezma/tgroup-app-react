import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AppFrame from './components/AppFrame';
import { Provider } from 'mobx-react';
import stores from './stores';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/" render={() => <AppFrame clase="blank" />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
