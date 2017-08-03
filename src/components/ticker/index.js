import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';
// sound to play
const REMINDER = new Audio(require('./ding.wav'));

class Ticker extends Component {

  render() {
    const minutes = Math.floor(this.props.ticks / 60);
    const seconds = this.props.ticks % 60;

    if (minutes === 0 && seconds <= 5 && seconds > 0) {
      REMINDER.play();
    }
    return(
      <div className="ticker">
        <p className={'' + (this.props.paused ? 'ticker-paused': '')}>{minutes + ":" + (seconds < 10 ? "0" + seconds : seconds)}</p>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

const mapStateToProps = (state) => {
    return Object.assign({}, state.timeState, {paused: state.appState.paused});
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
