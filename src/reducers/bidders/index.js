import * as types from '../../actions/types';

const initialState = {
  bidders: []
};

export default function bidderState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_BIDDERS:
      const bidderList = action.payload;
      console.log(bidderList)

      return Object.assign({}, state, {bidders: bidderList});
    default:
      return state;
  }
}
