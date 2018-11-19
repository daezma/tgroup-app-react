import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AppFrame from './components/AppFrame';
import { Provider } from 'mobx-react';
import stores from 'MobX';

class App extends Component {
  renderHome = () => <AppFrame />;

  render() {
    return (
      <Provider {...stores}>
        <Router>
          <div className='App'>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={this.renderHome} />
            {/* <Route exact path='/home' render={props => <AppFrame {...props} body={props.match.params.algo} />} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
