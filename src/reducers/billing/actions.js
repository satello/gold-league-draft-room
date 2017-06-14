import * as types from './actionTypes';

import { startLoading, doneLoading, sendSuccessNotification, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function loadSubscription() {
    return (dispatch, getState) => {
        const { jwt, loggedInUser }  = getState().appState;

        dispatch(startLoading());

        fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}/subscription` , {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(response => {
            return response.json();
        }).then(subscription => {
            if (subscription.error) throw Error(subscription.error);
            dispatch(subscriptionUpdated(subscription));
            dispatch(subscriptionLoaded());
            dispatch(doneLoading());
        }).catch(error => {
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
            'Please try again!' : error.message;
            dispatch(doneLoading());
            dispatch(subscriptionLoaded());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

export function subscribe(cc_token) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const { jwt, loggedInUser } = getState().appState;

        // make put for user
        fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}/subscription` , {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                cc_token: cc_token,
                plan_id: 1
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(response => {
            return response.json();
        })
        .then(subscription =>{
            if (subscription.error) throw Error(subscription.error);
            dispatch(doneLoading());
            dispatch(subscriptionUpdated(subscription));
            dispatch(sendSuccessNotification('Plan purchase successful!'));
        })
        .catch(error => {
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! Something went wrong. Please try again!' :
                error.message;
            dispatch(doneLoading());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

export function updateCreditCard(cc_token) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const { jwt, loggedInUser } = getState().appState;

        // make put for user
        fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}/subscription` , {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                type: 'cc_update',
                cc_token: cc_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(response => {
            return response.json();
        })
        .then(subscription =>{
            if (subscription.error) throw Error(subscription.error);
            dispatch(doneLoading());
            dispatch(showUpdateCreditCardForm(false));
            dispatch(sendSuccessNotification('Your card was updated successfully!'));
        })
        .catch(error => {
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! Something went wrong. Please try again!' :
                error.message;
            dispatch(doneLoading());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

export function showUpdateCreditCardForm(bool) {
    return {
        type: types.UPDATE_CREDIT_CARD,
        payload: bool
    }
}


function subscriptionLoaded() {
    return {
        type: types.SUBSCRIPTION_LOADED
    }
}

function subscriptionUpdated(subscription) {
    return {
        type: types.UPDATE_SUBSCRIPTION,
        payload: subscription
    }
}