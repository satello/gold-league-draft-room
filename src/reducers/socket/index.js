import * as types from '../../actions/types';

const initialState = {
  loggedIn: false,
  connected: false
};

export default function socketState(state = initialState, action = {}) {
  switch (action.type) {
    case types.SOCKET_CONNECTED:
      return Object.assign({}, state, {connected: true});
    case types.SOCKET_DISCONNECTED:
      return Object.assign({}, state, {connected: false});
    case types.INVALID_JWT:
      return Object.assign({}, state, {loggedIn: false});
    case types.VALID_JWT:
      console.log("new things");
      return Object.assign({}, state, {loggedIn: true});
    default:
      return state;
  }
}
