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

export function newPlayerNomination(body) {
  return {
    type: types.NEW_PLAYER_NOMINATION,
    payload: body
  }
}

export function newPlayerBid(body) {
  return {
    type: types.NEW_PLAYER_BID,
    payload: body
  }
}

export function placeBid(body) {
  return {
    type: types.PLACE_BID,
    payload: body
  }
}
