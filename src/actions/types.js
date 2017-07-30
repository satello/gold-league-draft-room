// app
export const APP_INITIALIZED = 'app.APP_INITIALIZED';
export const UPDATE_LOGGED_IN_USER = 'app.UPDATE_LOGGED_IN_USER';
export const LOGOUT_USER = 'app.LOGOUT_USER';
export const UPDATE_JWT = 'app.UPDATE_JWT';
export const IS_LOADING = 'app.IS_LOADING';
export const UPDATE_NOTIFICATION = 'app.UPDATE_NOTIFICATION';
export const IS_ONBOARDING = 'app.IS_ONBOARDING';
export const TOGGLE_NAV = 'app.TOGGLE_NAV';
export const SHOW_AUCTION_ROOM_ID = 'app.SHOW_AUCTION_ROOM_ID';
export const START_AUCTION_REQUEST = 'app.START_AUCTION_REQUEST';
export const START_DRAFT = 'app.START_DRAFT';
export const PAUSE_DRAFT = 'app.PAUSE_DRAFT';
export const PAUSE_DRAFT_REQUEST = 'app.PAUSE_DRAFT_REQUEST';
export const UNPAUSE_DRAFT = 'app.UNPAUSE_DRAFT';
export const RESUME_DRAFT_REQUEST = 'app.RESUME_DRAFT_REQUEST';
export const END_DRAFT = 'app.END_DRAFT';
export const INIT_APP_STATE = 'app.INIT_APP_STATE';
// websocket
export const SOCKET_CONNECT = 'socket.SOCKET_CONNECT';
export const SOCKET_DISCONNECT = 'socket.SOCKET_DISCONNECT';
export const SOCKET_CONNECTED = 'socket.SOCKET_CONNECTED';
export const SOCKET_DISCONNECTED = 'socket.SOCKET_DISCONNECTED';
// auth
export const VALIDATE_BIDDER = 'auth.VALIDATE_BIDDER';
export const REQUEST_JWT = 'auth.REQUEST_JWT';
export const VALID_BIDDER = 'auth.VALID_BIDDER';
export const INVALID_BIDDER = 'auth.INVALID_BIDDER';
// messages
export const SEND_CHAT_MESSAGE = 'msg.SEND_CHAT_MESSAGE';
export const RECIEVE_CHAT_MESSAGE = 'msg.RECIEVE_CHAT_MESSAGE';
// bidders
export const FETCH_BIDDERS = 'bidder.FETCH_BIDDERS';
export const RECEIVE_BIDDERS = 'bidder.RECEIVE_BIDDERS';
export const UPDATE_BIDDER = 'bidder.UPDATE_BIDDER';
export const NEW_NOMINEE = 'bidder.NEW_NOMINEE';
export const NEW_PLAYER_NOMINATION = 'bidder.NEW_PLAYER_NOMINATION';
export const NEW_PLAYER_BID = 'bidder.NEW_PLAYER_BID';
export const PLACE_BID = 'bidder.PLACE_BID';
export const INIT_DRAFT_STATE = 'bidder.INIT_DRAFT_STATE';

// players
export const FETCH_PLAYERS = 'player.FETCH_PLAYERS';
export const RECEIVE_PLAYERS = 'player.RECEIVE_PLAYERS';
export const SELECT_PLAYER = 'player.SELECT_PLAYER';
export const NOMINATE_PLAYER = 'player.NOMINATE_PLAYER';
export const REMOVE_PLAYER_FROM_POOL = 'player.REMOVE_PLAYER_FROM_POOL';
// time
export const UPDATE_TICKER = 'time.UPDATE_TICKER';
// drafts
export const GET_DRAFT_ROOMS = 'drafts.GET_DRAFT_ROOMS';
export const ROLLBACK_NOMINATION = 'drafts.ROLLBACK_NOMINATION';
