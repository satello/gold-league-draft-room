import * as types from '../types';

export function fetchBidders() {
  return {
    type: types.FETCH_BIDDERS,
  }
}

export function receiveBidders(body) {
  return {
    type: types.RECEIVE_BIDDERS,
    payload: body.bidders
  }
}
