import * as types from '../types';

const WS_ENDPOINT = process.env.REACT_APP_WS_ENDPOINT;

export function connectSocket(roomId) {
  return {
    type: types.SOCKET_CONNECT,
    url: `${WS_ENDPOINT}/${roomId}/connect`
  }
}

export function disconnectSocket() {
  return {
    type: types.SOCKET_DISCONNECT,
  }
}

export function connected() {
  return {
    type: types.SOCKET_CONNECTED
  }
}

export function disconnected() {
  return {
    type: types.SOCKET_DISCONNECTED
  }
}

export function authorizeBidder() {
  return {
    type: types.VALIDATE_BIDDER
  }
}

export function requestJwt() {
  return {
    type: types.REQUEST_JWT
  }
}

export function validBidder() {
  return {
    type: types.VALID_BIDDER
  }
}

export function invalidBidder() {
  return {
    type: types.INVALID_BIDDER
  }
}
