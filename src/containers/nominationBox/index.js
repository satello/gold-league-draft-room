import React, { Component } from 'react';
import { connect } from 'react-redux';

// style
import './style.scss';

import PlayerAvatar from '../../components/playerAvatar';
import * as playerActions from '../../actions/players'


class NominationBox extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.playerState.selectedPlayer !== nextProps.playerState.selectedPlayer) {
      return true
    }
    return false
  }

  nominatePlayer() {
    // no nominating if paused
    if (this.props.appState.paused) return;
    const bidderId = localStorage.getItem("bidderId");
    // if nothing to nominate don't do it
    if (!this.props.playerState.selectedPlayer) return;
    // make sure bidder is allowed to nominate
    if (this.props.bidderState.currentNominatorId !== bidderId) return;
    const amountDiv = document.getElementById("nominationAmount");
    this.props.nominatePlayer({
      name: this.props.playerState.selectedPlayer.name,
      bidderId: bidderId,
      amount: amountDiv.value
    });
  }

  render() {
    if (!this.props.playerState) return false;
    let playerDiv;

    const isCurrentNominator = this.props.bidderState.currentNominatorId === localStorage.getItem("bidderId");

    if (this.props.playerState.selectedPlayer) {
      playerDiv = <PlayerAvatar player={this.props.playerState.selectedPlayer} />
    } else {
      playerDiv = <PlayerAvatar player={{name: "Select A Player", position: "N/A", bye: 0}} />
    }
    return (
      <div className="nomination-box">
        <div className="row">
          <div className="col-md-6">
            {playerDiv}
          </div>
          <div className="col-md-6 nomination-input">
            <input id="nominationAmount" type="number" step="1" defaultValue={1}/>
            <div className={"btn nomination-btn" + (isCurrentNominator ? " active" : "")} onClick={this.nominatePlayer.bind(this)}>Nominate</div>
          </div>
        </div>
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
