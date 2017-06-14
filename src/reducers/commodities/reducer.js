import * as types from './actionTypes';

const initialState = {
    hasLoaded: false,
    commodityList: null,
};

export default function commodities(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOAD_COMMODITIES:
            return Object.assign({}, state, {
                hasLoaded: false
            });
        case types.COMMODITIES_DETAILS_LOADED:
            console.log(action.payload);
            return Object.assign({}, state, {
                hasLoaded: true,
                commodityList: action.payload.commodities
            });
        default:
            return state;
    }
}
