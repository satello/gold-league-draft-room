import * as types from '../types';
import helpers from '../../helpers';
import * as payloadTypes from '../socket/payloadTypes';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function chatMessageRecieved(msg) {
  return {
    type: types.RECIEVE_CHAT_MESSAGE,
    data: msg
  }
}

export function sendChatMessage(msg) {
  const payload = {
    MessageType: payloadTypes.SEND_CHAT_MESSAGE,
    BidderId: localStorage.getItem('bidderId') || null,
    Body: {
      message: msg,
      sender: localStorage.getItem('name') || 'sam'
    }
  }

  return {
    type: types.SEND_CHAT_MESSAGE,
    payload: payload
  }
}
