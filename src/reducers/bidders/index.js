import * as types from '../../actions/types';

const initialState = {
  biddersLoaded: false,
  bidders: [],
  currentNominatorId: null,
  currentPlayerName: null,
  currentBid: null,
  currentBidderId: null
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
      return Object.assign({}, state, {
        currentNominatorId: action.payload,
        currentPlayerName: null,
        currentBid: null,
        currentBidderId: null});
    case types.NEW_PLAYER_NOMINATION:
      // TODO make this and NEW_PLAYER_BID into one?
      return Object.assign({}, state, {
        currentPlayerName: action.payload.name,
        currentBid: action.payload.bid,
        currentBidderId: action.payload.bidderId
      });
    case types.NEW_PLAYER_BID:
      return Object.assign({}, state, {
        currentPlayerName: action.payload.name,
        currentBid: action.payload.bid,
        currentBidderId: action.payload.bidderId
      });
    case types.INIT_DRAFT_STATE:
      return Object.assign({}, state, {
        currentNominatorId: state.currentNominatorId ? state.currentNominatorId : action.payload.currentNominatorId,
        currentPlayerName: state.currentPlayerName ? state.currentPlayerName : action.payload.currentPlayerName,
        currentBid: state.currentBid ? state.currentBid : action.payload.currentBid,
        currentBidderId: state.currentBidderId ? state.currentBidderId : action.payload.currentBidderId,});
    default:
      return state;
  }
}
