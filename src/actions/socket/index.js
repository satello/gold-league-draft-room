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

export function authorizeJwt() {
  return {
    type: types.VALIDATE_JWT
  }
}

export function requestJwt() {
  return {
    type: types.REQUEST_JWT
  }
}

export function validJwt() {
  return {
    type: types.VALID_JWT
  }
}

export function invalidJwt() {
  return {
    type: types.INVALID_JWT
  }
}
