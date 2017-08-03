import * as types from '../../actions/types';

// this is so performance from the chat doesn't hurt everything else
const MESSAGE_LIST_CAP = 15;

const initialState = {
  messageList: []
};

export default function messageState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECIEVE_CHAT_MESSAGE:
      const newChat = action.data.sender + ": " + action.data.message;
      const curLength = state.messageList.length;
      let messageListCopy;
      if (curLength >= MESSAGE_LIST_CAP) {
        const over = curLength - MESSAGE_LIST_CAP + 1;
        // remove the first n items from list that it is over the cap + 1 for new message
        messageListCopy = state.messageList.slice(over, MESSAGE_LIST_CAP);
      } else {
        // copy whole list
        messageListCopy = state.messageList.slice();
      }
      messageListCopy.push(newChat)

      return Object.assign({}, state, {messageList: messageListCopy});
    default:
      return state;
  }
}
