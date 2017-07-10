import * as types from '../types';
import helpers from '../../helpers';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function chatMessageRecieved(msg) {
  return {
    type: types.RECIEVE_CHAT_MESSAGE,
    data: msg
  }
}
