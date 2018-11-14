import React, { Component } from 'react';
//import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
//import MenuAppBar from './components/MenuAppBar';
import Login from './components/Login';
import AppFrame from './components/AppFrame';

class App extends Component {
  render() {
    return (
      // <Grid fluid>
      //   <Row>
      //     <MenuAppBar />
      //   </Row>
      //   <Row>
      //     <Col xs={12} md={6}>
      //       <Login />
      //     </Col>
      //     {/* <Col xs={12} md={6}>
      //   </Col> */}
      //   </Row>
      // </Grid>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={AppFrame()} />
        </div>
      </Router>
    );
  }
}

export default App;
