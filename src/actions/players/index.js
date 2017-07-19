import * as types from '../types';

export function fetchPlayers() {
  return {
    type: types.FETCH_PLAYERS,
  }
}

export function receivePlayers(body) {
  return {
    type: types.RECEIVE_PLAYERS,
    payload: body.players
  }
}
