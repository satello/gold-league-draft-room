import * as types from '../../actions/types';

const initialState = {
    jwt: null,
    isInitialized: false,
    hasRoomId: false,
    roomId: null,
    isRunning: false,
    paused: false,
};

export default function appState(state = initialState, action = {}) {
    switch (action.type) {
        case types.APP_INITIALIZED:
            return Object.assign({}, state, {
                isInitialized: action.payload
            });
        case types.UPDATE_JWT:
            return Object.assign({}, state, {
                jwt: action.payload
            });
        case types.SHOW_AUCTION_ROOM_ID:
          return Object.assign({}, state, {
            hasRoomId: true,
            roomId: action.roomId
          });
        case types.START_DRAFT:
          return Object.assign({}, state, {
            isRunning: true
          });
        case types.END_DRAFT:
          return Object.assign({}, state, {
            isRunning: false
          });
        case types.PAUSE_DRAFT:
          return Object.assign({}, state, {
            paused: true
          });
        case types.UNPAUSE_DRAFT:
          return Object.assign({}, state, {
            paused: false
          });
        case types.INIT_APP_STATE:
          return Object.assign({}, state, {
            paused: action.payload.paused,
            isRunning: action.payload.draftRunning,
          });
        default:
            return state;
    }
}
