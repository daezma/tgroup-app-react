import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';
import { withRouter } from 'react-router-dom';
import InitPage from './InitPage';

class AppFrame extends Component {
  render() {
    const { clase } = this.props;
    const contenido = (() => {
      switch (clase) {
        case 'blank':
          return <InitPage />;
        default:
          break;
      }
    })();

    return (
      <div>
        <div className="app-frame">
          <MenuAppBar />
          <div>{contenido}</div>
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

export default withRouter(AppFrame);
