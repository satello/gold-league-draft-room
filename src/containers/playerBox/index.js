import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import BidderAvatar from '../../components/bidderAvatar';
import PlayerTable from '../../components/table';

import * as playerActions from '../../actions/players';

const tableHeadings = [
  {id: "name", displayName: "name"},
  {id: "position", displayName: "position"},
  {id: "bye", displayName: "bye"},
  {id: "value", displayName: "value"}
]

class PlayerBox extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!this.props.playerState.playersLoaded) {
      this.props.getPlayers();
    }
  }

  render() {
    if (!this.props.playerState || !this.props.playerState.playersLoaded) return false;
    const players = this.props.playerState.players;

    const settings = {
      sortVal: "value",
      direction: "desc"
    }

    return(
      <div className="players-box">
        <PlayerTable tableId="players-table" tableHeadings={tableHeadings} data={players} defaultSort="value"/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayers: () => {
      dispatch(playerActions.fetchPlayers());
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBox);
