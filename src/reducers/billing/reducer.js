import * as types from './actionTypes';

const initialState = {
    subscription: null,
    organization: null,
    planCost: null,
    hasLoaded: false,
    showUpdateCreditCardForm: false
};

export default function billing(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_SUBSCRIPTION:
            return Object.assign({}, state, {
                subscription: action.payload.subscription,
                organization: action.payload.organization,
                planCost: action.payload.subscription.plan.price,
            });
        case types.SUBSCRIPTION_LOADED:
            return Object.assign({}, state, {
                hasLoaded: true,
                showUpdateCreditCardForm: false
            });
        case types.UPDATE_CREDIT_CARD:
            return Object.assign({}, state, {
                showUpdateCreditCardForm: action.payload
            });
        default:
            return state;
    }
}
