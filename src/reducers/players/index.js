import * as types from '../../actions/types';

const initialState = {
  playersLoaded: false,
  players: []
};

export default function playerState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_PLAYERS:
      const playerList = action.payload;

      return Object.assign({}, state, {players: playerList, playersLoaded: true});
    default:
      return state;
  }
}
