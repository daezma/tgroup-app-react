import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AppFrame from './components/AppFrame';
import PenVenPage from './components/PenVenPage';
import { Provider } from 'mobx-react';
import stores from './stores';

class App extends Component {
  renderHome = () => <AppFrame clase='blank' />;
  renderPenVenPage = () => <PenVenPage />;

  render() {
    return (
      <Provider {...stores}>
        <Router>
          <div className='App'>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={this.renderHome} />
            <Route exact path='/penven' component={this.renderPenVenPage} />
            {/* <Route exact path='/home' render={props => <AppFrame {...props} body={props.match.params.algo} />} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
