import React, { Component } from 'react';
import { connect } from 'react-redux';

// style
import './style.scss';

import PlayerAvatar from '../../components/playerAvatar';
import * as playerActions from '../../actions/players'


class NominationBox extends Component {

  nominatePlayer() {
    const bidderId = localStorage.getItem("bidderId");
    if (!this.props.playerState.selectedPlayer) return;
    if (!this.props.bidderState.currentBidderId === localStorage.getItem("bidderId")) return;
    this.props.nominatePlayer(Object.assign({}, {name: this.props.playerState.selectedPlayer.name}, {bidderId: bidderId}));
  }

  render() {
    if (!this.props.playerState) return false;
    let playerDiv;

    if (this.props.playerState.selectedPlayer) {
      playerDiv = <PlayerAvatar player={this.props.playerState.selectedPlayer} />
    } else {
      playerDiv = <PlayerAvatar player={{name: "Select A Player", position: "N/A", bye: 0}} />
    }
    return (
      <div className="nomination-box">
        {playerDiv}
        <div className={"btn nomination-btn" + (this.props.bidderState.currentBidderId === localStorage.getItem("bidderId") ? " active" : "")} onClick={this.nominatePlayer.bind(this)}>Nominate</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nominatePlayer: (player) => {
      dispatch(playerActions.nominatePlayer(player));
    },
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(NominationBox);
