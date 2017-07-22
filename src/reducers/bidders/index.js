import * as types from '../../actions/types';

const initialState = {
  biddersLoaded: false,
  bidders: [],
  currentBidderId: null,
};

export default function bidderState(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_BIDDERS:
      const bidderList = action.payload;

      return Object.assign({}, state, {bidders: bidderList, biddersLoaded: true});
    case types.UPDATE_BIDDER:
      const bidder = action.payload;

      return {
        ...state,
        bidders: state.bidders.map(
          (b, i) => b.bidderId === bidder.bidderId ? bidder : b
        )
      }
    case types.NEW_NOMINEE:
      const bidderId = action.payload;

      return Object.assign({}, state, {currentBidderId: bidderId});
    default:
      return state;
  }
}
