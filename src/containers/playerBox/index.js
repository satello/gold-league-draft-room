import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

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

  selectPlayer(playerName) {
    this.props.selectPlayer(playerName);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.playerState.players.length != nextProps.playerState.players.length) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    // console.log("updating shit");
    // const rows = $("#players-table tbody tr");
    //
    // for (var i=0; i<rows.length; i++) {
    //   rows[i].onclick = this.selectPlayer.bind(this);
    // }
  }

  render() {
    if (!this.props.playerState || !this.props.playerState.playersLoaded) return false;
    const players = this.props.playerState.players;

    // FIXME this is dumb AF stupid ass table library
    for (var i=0; i<players.length; i++) {
      // need to store each name as a const. yuck
      const playerName=players[i].name;
      players[i].onClick = () => { this.selectPlayer(playerName) };
    }

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
    },
    selectPlayer: (playerName) => {
      dispatch(playerActions.selectPlayer(playerName));
    }
  }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBox);
