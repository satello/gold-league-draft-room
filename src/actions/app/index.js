import * as types from '../types';
import helpers from '../../helpers';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function initializeApp() {
  return dispatch => {
    const urlParamJwt = helpers.getUrlParameter('code') || null;
    const localStorageJwt = localStorage.getItem('bidderId') || null;
    const jwt = urlParamJwt || localStorageJwt || null;

    if (jwt) {
      // FIXME
      dispatch(appInitialized());
    }
    else {
      dispatch(appInitialized());
    }
  }
}

export function startDraft() {
  return dispatch => {
    dispatch(startDraftRequest());
    // FIXME I am being lazy and cheating here. should wait for server response
    dispatch(draftStarted());
  }
}

function startDraftRequest() {
  return {
    type: types.START_AUCTION_REQUEST
  }
}

function draftStarted() {
  return {
    type: types.START_DRAFT
  }
}

export function pauseDraft() {
  return {
    type: types.PAUSE_DRAFT_REQUEST
  }
}

export function draftPaused() {
  return {
    type: types.PAUSE_DRAFT
  }
}

export function resumeDraft() {
  return {
    type: types.RESUME_DRAFT_REQUEST
  }
}

export function draftResumed() {
  return {
    type: types.UNPAUSE_DRAFT
  }
}

function appInitialized() {
    return {
        type: types.APP_INITIALIZED,
        payload: true
    }
}

export function openAuctionRoom(payload) {
  return dispatch => {
    fetch(`${API_ENDPOINT}/new-room`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
      // turn response into json
      return response.json();
    })
    .then(response => {
      dispatch(showAuctionRoomId(response.result));
    })
    .catch(error => {
        console.log(error.message);
        // if can't auth user, logout and send to login page
    });
  }
}

function showAuctionRoomId(roomId) {
  return {
    type: types.SHOW_AUCTION_ROOM_ID,
    roomId: roomId
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
