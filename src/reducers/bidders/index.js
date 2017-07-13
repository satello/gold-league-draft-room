import * as types from '../../actions/types';

const initialState = {
  biddersLoaded: false,
  bidders: []
};

export default function bidderState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_BIDDERS:
      const bidderList = action.payload;

      return Object.assign({}, state, {bidders: bidderList, biddersLoaded: true});
    default:
      return state;
  }
}
