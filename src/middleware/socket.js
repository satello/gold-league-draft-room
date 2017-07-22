import * as socketActions   from '../actions/socket';
import * as bidderActions   from '../actions/bidders';
import * as chatActions     from '../actions/messages';
import * as playerActions     from '../actions/players';
import * as timeActions     from '../actions/time';
import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SEND_CHAT_MESSAGE,
  VALIDATE_BIDDER,
  REQUEST_JWT,
  FETCH_BIDDERS,
  FETCH_PLAYERS,
  START_AUCTION
} from '../actions/types';
import { AUTHORIZE_TOKEN, REQUEST_TOKEN, REQUEST_BIDDERS, REQUEST_PLAYERS, START_DRAFT } from '../actions/socket/payloadTypes';

const socketMiddleware = (function(){
  var socket = null;

  const onOpen = (ws,store) => evt => {
    //Send a handshake, or authenticate with remote end
    store.dispatch(socketActions.connected());
  }

  const onClose = (ws,store) => evt => {
    //Tell the store we've disconnected
    store.dispatch(socketActions.disconnected());
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    // FIXME is this best way to do this?
    const evts = evt.data.split("\n");

    for (var i=0; i<evts.length; i++) {
      var msg = JSON.parse(evts[i]);

      console.log(msg.MessageType);
      switch(msg.MessageType) {
        case "TOKEN_VALID":
          store.dispatch(socketActions.validBidder());
          break;
        case "NEW_TOKEN":
          localStorage.setItem('bidderId', msg.body.token);
          store.dispatch(socketActions.authorizeBidder());
          break;
        case "INVALID_TOKEN":
          // get new token
          // store.dispatch(socketActions.requestJwt());
          store.dispatch(socketActions.invalidBidder());
          break;
        case "BAD_TOKEN_REQUEST":
          store.dispatch(socketActions.disconnectSocket());
          break;
        case "CHAT_MESSAGE":
          //Dispatch an action that adds the received message to our state
          store.dispatch(chatActions.chatMessageRecieved(msg.body));
          break;
        case "GET_BIDDERS":
          store.dispatch(bidderActions.receiveBidders(msg.body));
          break;
        case "GET_PLAYERS":
          store.dispatch(playerActions.receivePlayers(msg.body));
          break;
        case "BIDDER_STATE_CHANGE":
          store.dispatch(bidderActions.updateBidder(msg.body));
          break;
        case "NEW_NOMINEE":
          store.dispatch(bidderActions.newNominee(msg.body));
          break;
        case "TICKER_UPDATE":
          store.dispatch(timeActions.updateTicker(msg.body));
        default:
          console.log("Received unknown message type: '" + msg.type + "'");
          break;
      }
    }
  }

  return store => next => action => {
    switch(action.type) {
      //The user wants us to connect
      case SOCKET_CONNECT:
        //Start a new connection to the server
        if(socket != null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        // store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        try {
          socket = new WebSocket(action.url);
        } catch (e) {
          // TODO do some retry
        }
        socket.onmessage = onMessage(socket,store);
        socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket,store);

        break;
      //The user wants us to disconnect
      case SOCKET_DISCONNECT:
        if(socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        store.dispatch(socketActions.disconnected());
        break;
      case REQUEST_JWT:
        // no previous credentials
        const userInfo = JSON.parse(localStorage.getItem("user"));

        if (!userInfo) {
          // FIXME redirect to some log in type screen
          console.log("uh oh");
        }
        const authJson = {
          "MessageType": REQUEST_TOKEN,
          "body": {
            "name": userInfo.name,
            "cap": parseInt(userInfo.cap, 10),
            "spots": parseInt(userInfo.spots, 10)
          }
        }

        socket.send(JSON.stringify(authJson));
        break;
      case VALIDATE_BIDDER:
        const bidderId = localStorage.getItem("bidderId");

        if (!bidderId) {
          // shouldn't get here...
          console.log("BROKEN!!! FIXME");
          // store.dispatch(socketActions.requestJwt());
          next(action);
          break;
        }
        // credientials exist. verify they are valid
        socket.send(JSON.stringify({
          "MessageType": AUTHORIZE_TOKEN,
          "body": {
            "token": bidderId
          }
        }));
        break;
      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case SEND_CHAT_MESSAGE:
        socket.send(JSON.stringify(action.payload));
        break;
      case FETCH_BIDDERS:
        socket.send(JSON.stringify({
          "MessageType": REQUEST_BIDDERS
        }));
        break;
      case FETCH_PLAYERS:
        socket.send(JSON.stringify({
          "MessageType": REQUEST_PLAYERS
        }));
        break;
      case START_AUCTION:
        socket.send(JSON.stringify({
          "MessageType": START_DRAFT
        }))
      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
