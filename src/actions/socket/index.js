import * as types from '../types';
import helpers from '../../helpers';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function connectSocket() {
  return {
    type: types.SOCKET_CONNECT,
    url: `${API_ENDPOINT}/connect`
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
