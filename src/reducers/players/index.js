import * as types from '../../actions/types';
import _ from 'lodash';

const initialState = {
  playersLoaded: false,
  players: [],
  selectedPlayer: null
};

export default function playerState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_PLAYERS:
      const playerList = action.payload;

      return Object.assign({}, state, {players: playerList, playersLoaded: true});

    case types.SELECT_PLAYER:
      // FIXME probably not that efficient
      const playerObject = _.filter(state.players, function(o) {
        return o.name == action.payload;
      })[0];
      console.log("REDUCER");
      console.log(playerObject);
      console.log(action.payload);

      return Object.assign({}, state, {selectedPlayer: playerObject});
    default:
      return state;
  }
}
