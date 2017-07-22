import * as types from '../../actions/types';

const initialState = {
  timerActive: true,
  ticks: 30
};

export default function timeState(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_TICKER:
      return Object.assign({}, state, {ticks: action.payload});
    default:
      return state;
  }
}
