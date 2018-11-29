import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from './MenuAppBar';
import { withRouter } from 'react-router-dom';
//import InitPage from './InitPage';

class AppFrame extends Component {
  render() {
    //const { clase } = this.props;
    return (
      <div>
        <div className='app-frame'>
          <MenuAppBar />
          <div>
            {/* {(() => {
              switch (clase) {
                case 'blank':
                  <InitPage />;
                  break;

                default:
                  break;
              }
            })()} */}
          </div>
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
