import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Ticker extends Component {

  render() {
    const minutes = Math.floor(this.props.ticks / 60);
    const seconds = this.props.ticks % 60;

    return(
      <div className="ticker row">
        <div className="col-md-1">
          <p>{minutes + ":" + (seconds < 10 ? "0" + seconds : seconds)}</p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

const mapStateToProps = (state) => {
    return state.timeState;
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
