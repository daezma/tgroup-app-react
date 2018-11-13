import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';
import MenuAppBar from './components/MenuAppBar';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Grid fluid>
      <Row>
        <MenuAppBar />
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Login></Login>
        </Col>
        {/* <Col xs={12} md={6}>
        </Col> */}
      </Row>
    </Grid>
    );
  }
}

export default App;