import * as types from '../types';
import * as payloadTypes from '../socket/payloadTypes';

export function chatMessageRecieved(msg) {
  return {
    type: types.RECIEVE_CHAT_MESSAGE,
    data: msg
  }
}

export function sendChatMessage(msg) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const payload = {
    MessageType: payloadTypes.SEND_CHAT_MESSAGE,
    BidderId: localStorage.getItem('bidderId') || null,
    Body: {
      message: msg,
      sender: user.name
    }
  }

  return {
    type: types.SEND_CHAT_MESSAGE,
    payload: payload
  }
}
