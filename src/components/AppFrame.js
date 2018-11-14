import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';

class AppFrame extends Component {
  render() {
    return (
      <div>
        <div className='app-frame'>
          <MenuAppBar />
          <div>{null}</div>
          <div>
            <p>Tgroup Sistemas</p>
          </div>
        </div>
      </div>
    );
  }
}

AppFrame.propTypes = {
  body: PropTypes.element.isRequired
};

export default AppFrame;
