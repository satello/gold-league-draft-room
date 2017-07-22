import * as types from '../types';

export function updateTicker(body) {
  return {
    type: types.UPDATE_TICKER,
    payload: body.ticks
  }
}
