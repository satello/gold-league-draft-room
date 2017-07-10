import * as types from '../../actions/types';

const initialState = {
  messageList: []
};

export default function messageState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECIEVE_CHAT_MESSAGE:
      const newChat = action.data.sender + ": " + action.data.message;
      const messageListCopy = state.messageList.slice();
      messageListCopy.push(newChat)

      return Object.assign({}, state, {messageList: messageListCopy});
    default:
      return state;
  }
}
