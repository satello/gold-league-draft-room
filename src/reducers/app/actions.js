import * as types from './actionTypes';
import helpers from '../../helpers';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function initializeApp() {
    return dispatch => {
        const urlParamJwt = helpers.getUrlParameter('code') || null;
        const localStorageJwt = localStorage.getItem('jwt') || null;
        const jwt = urlParamJwt || localStorageJwt || null;

        if (jwt) {
            dispatch(loginUser(jwt, urlParamJwt !== null));
        }
        else {
            dispatch(appInitialized());
        }
    }
}

function appInitialized() {
    return {
        type: types.APP_INITIALIZED,
        payload: true
    }
}

function loginUser(jwt, saveToLocalStorage) {
    return dispatch => {
        if (saveToLocalStorage) localStorage.setItem('jwt', jwt);
        dispatch(updateJwt(jwt));
        dispatch(fetchLoggedInUser(jwt));
    }
}

function updateJwt(jwt) {
    return {
        type: types.UPDATE_JWT,
        payload: jwt
    }
}

function fetchLoggedInUser(jwt) {
    return (dispatch => {
        dispatch(startLoading());
        fetch(`${API_ENDPOINT}/users/me`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(response => {
            // turn response into json
            return response.json();
        })
        .then(user => {
            if (user.message==='Invalid Token') throw user;
            if (user.selected_calendar === null) dispatch(startOnboarding());
            // update loggedInUser in store and initialize app
            dispatch(updateUser(user));
            dispatch(appInitialized());
            dispatch(doneLoading());
        })
        .catch(error => {
            console.log(error.message);
            // if can't auth user, logout and send to login page
            dispatch(logoutUser());
            dispatch(appInitialized());
            dispatch(doneLoading());
        });
    });
}

function updateUser(user) {
    return {
        type: types.UPDATE_LOGGED_IN_USER,
        payload: user
    }
}

function startOnboarding() {
    return {
        type: types.IS_ONBOARDING,
        payload: true
    }
}

export function onboardingFinished() {
    return {
        type: types.IS_ONBOARDING,
        payload: false
    }
}

// LOGOUT
export function logoutUser() {
    return dispatch => {
        // delete the jwt from local storage
        localStorage.removeItem('jwt');
        // remove jwt from redux store
        dispatch(updateJwt(null));
        // dispatch to reducer
        dispatch(logout());
    }
}

function logout() {
    return {
        type: types.LOGOUT_USER
    }
}

// LOADING
export function startLoading() {
    return dispatch => {
        dispatch(isLoading(true))
    }

}
export function doneLoading() {
    return dispatch => {
        setTimeout(() => {
            dispatch(isLoading(false))
        }, 500);
    }
}

function isLoading(bool) {
    return {
        type: types.IS_LOADING,
        payload: bool
    }
}

// NOTIFICATIONS

export function sendSuccessNotification(msg) {
    return dispatch => {
        dispatch(updateNotification({
            show: true,
            type: 'success',
            message: msg
        }));
        setTimeout(() => {
            dispatch(dismissNotification());
        }, 5000);
    }
}

export function sendErrorNotification(msg) {
    return dispatch => {
        dispatch(updateNotification({
            show: true,
            type: 'error',
            message: msg
        }));
        setTimeout(() => {
            dispatch(dismissNotification());
        }, 5000);
    }
}

export function dismissNotification() {
    return {
        type: types.UPDATE_NOTIFICATION,
        payload: {
            show: false
        }
    }
}

function updateNotification(notification) {
    return {
        type: types.UPDATE_NOTIFICATION,
        payload: notification
    }
}

export function toggleNav() {
    return {
       type: types.TOGGLE_NAV
    }
}