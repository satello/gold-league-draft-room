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

export function updateBidder(body) {
  return {
    type: types.UPDATE_BIDDER,
    payload: body.bidder
  }
}

export function newNominee(body) {
  return {
    type: types.NEW_NOMINEE,
    payload: body.bidderId
  }
}
