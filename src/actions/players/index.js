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

export function selectPlayer(player) {
  return {
    type: types.SELECT_PLAYER,
    payload: player
  }
}

export function nominatePlayer(player) {
  return {
    type: types.NOMINATE_PLAYER,
    payload: player
  }
}
