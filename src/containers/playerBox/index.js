import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import PlayerTable from '../../components/table';

import * as playerActions from '../../actions/players';

const tableHeadings = [
  {id: "name", displayName: "name"},
  {id: "position", displayName: "position"},
  {id: "bye", displayName: "bye"}
]

class PlayerBox extends Component {
  componentWillMount() {
    if (!this.props.playerState.playersLoaded) {
      this.props.getPlayers();
    }
  }

  selectPlayer(playerName) {
    this.props.selectPlayer(playerName);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.playerState.players.length !== nextProps.playerState.players.length) return true;
    return false;
  }

  render() {
    if (!this.props.playerState || !this.props.playerState.playersLoaded) return false;
    const players = this.props.playerState.players;

    // FIXME this is dumb AF stupid ass table library
    let player;
    const data = [];
    console.log(players[0])
    for (var i=0; i<players.length; i++) {
      // need to store each name as a const. yuck
      const playerData = {}
      player = players[i]

      playerData.cells = {
        name: player.name,
        position: player.position,
        bye: player.bye,
        rank: player.redraft_rank
      }

      if (!player.taken) {
        const playerName=players[i].name;
        playerData.onClick = () => { this.selectPlayer(playerName) };
        data.push(playerData);
      }
    }

    return(
      <div className="players-box">
        <PlayerTable tableId="players-table" tableHeadings={tableHeadings} data={data} defaultSort="rank"/>
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
