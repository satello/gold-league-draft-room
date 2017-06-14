import * as types from './actionTypes';

import { startLoading, doneLoading, sendSuccessNotification, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function loadCalendars() {
    return (dispatch, getState) => {
        const { jwt, loggedInUser }  = getState().appState;

        dispatch(startLoading());
        dispatch(loadCalendar());

        fetch(`${API_ENDPOINT}/users/${loggedInUser.id}/calendars` , {
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
        }).then(calendars => {
            if (calendars.error) throw Error(calendars.error);
            if (calendars.length === 1) dispatch(calendarLoaded(calendars[0]));
            dispatch(doneLoading());
        }).catch(error => {
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
            'Please try again!' : error.message;
            dispatch(doneLoading());
            dispatch(calendarLoaded());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}
function calendarLoaded(calendar) {
    return {
        type: types.CALENDAR_DETAILS_LOADED,
        payload: calendar
    }
}

export function saveCalendar(cb) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const { jwt} = getState().appState;
        const {
            id,
            name,
            subdomain,
            price_per_meeting,
            meeting_length,
            meeting_padding
        } = getState().calendar.formData;

        // make put for user
        fetch(`${API_ENDPOINT}/calendars/${id}` , {
            method: 'put',
            mode: 'cors',
            body: JSON.stringify({
                name: name,
                subdomain: subdomain,
                price_per_meeting: price_per_meeting,
                meeting_length: meeting_length,
                meeting_padding: meeting_padding
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
        .then((calendars) =>{
            if (calendars.error) throw Error(calendars.error);
            dispatch(calendarSaved());
            dispatch(doneLoading());
            if (cb) cb();
            else dispatch(sendSuccessNotification('Calendar Updated'));
        })
        .catch(error => {
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! Something went wrong. Try again!' +
            'Please try again!' : error.message;
            dispatch(calendarSaved());
            dispatch(doneLoading());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

function loadCalendar() {
    return {
        type: types.LOAD_CALENDAR
    }
}

function calendarSaved() {
    return {
        type: types.CALENDAR_SAVED
    }
}

export function updateFormData(key, value) {
    return {
        type: types.UPDATE_CALENDAR_DETAILS,
        payload: {key: key, value: value}
    }
}

export function toggleEmbedCodeModal() {
    return {
        type: types.TOGGLE_EMBED_CODE
    }
}