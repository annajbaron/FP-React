import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class Welcome extends Component {

  enter(){
    this.props.enterSite();
  }

  render() {
    const {site} = this.props;
      return(
        <div>
          { site ? (
            <div className="welcome"></div>
          ) : (
            <div className="welcome">
              <div className="welcome-left">
                <img src="https://s3.amazonaws.com/collab-x-pictures/logoleft" className="img-left"/>
              </div>
              <div className="welcome-right">
                <img src="https://s3.amazonaws.com/collab-x-pictures/logoright" className="img-right"/>
              </div>
              <h1
                onClick={() => this.enter()}
                className="welcome-text font-effect-anaglyph"
              >enter</h1>
            </div>
          )}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    enterSite: (status) => dispatch(actions.enterSite(status))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
