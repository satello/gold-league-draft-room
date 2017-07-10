import * as socketActions from '../actions/socket';
import { chatMessageRecieved } from '../actions/messages';
import { SOCKET_CONNECT, SOCKET_DISCONNECT, SEND_CHAT_MESSAGE } from '../actions/types';


const socketMiddleware = (function(){
  var socket = null;

  // TODO add token back in for handshake
  const onOpen = (ws,store) => evt => {
    //Send a handshake, or authenticate with remote end

    //Tell the store we're connected
    store.dispatch(socketActions.connected());
  }

  const onClose = (ws,store) => evt => {
    //Tell the store we've disconnected
    store.dispatch(socketActions.disconnected());
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    console.log(evt);
    var msg = JSON.parse(evt.data);
    switch(msg.MessageType) {
      case "CHAT_MESSAGE":
        //Dispatch an action that adds the received message to our state
        store.dispatch(chatMessageRecieved(msg.Body));
        break;
      default:
        console.log("Received unknown message type: '" + msg.type + "'");
        break;
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
        socket = new WebSocket(action.url);
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

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case SEND_CHAT_MESSAGE:
        socket.send(JSON.stringify(action.payload));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
