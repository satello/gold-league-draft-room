import * as types from '../../actions/types';

const initialState = {
  drafts: {}
};

export default function appState(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_DRAFT_ROOMS:
      return Object.assign({}, state, {
        drafts: action.payload
      });
    default:
      return state;
  }
}
