import * as types from './actionTypes';

import { startLoading, doneLoading, sendSuccessNotification, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function loadSettings(paypalEmail) {
    return (dispatch, getState) => {
        const { jwt, loggedInUser }  = getState().appState;

        dispatch(startLoading());

        fetch(`${API_ENDPOINT}/users/${loggedInUser.id}` , {
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
        }).then(userSettings => {
            // flatten organization to match reducer
            const organization = userSettings.organization;
            userSettings.organization_name = organization.name;
            userSettings.organization_logo = organization.logo;
            userSettings.organization_website = organization.website;
            if (paypalEmail) {
                userSettings.organization_paypal_account_email = paypalEmail;
                userSettings.emailFromPaypal = true;
            } else {
                userSettings.emailFromPaypal = false;
                userSettings.organization_paypal_account_email = organization.paypal_account_email;
            }

            dispatch(settingsLoaded(userSettings));
            dispatch(doneLoading());
        }).catch(error => {
            console.log(error);
            dispatch(settingsLoaded());
            dispatch(doneLoading());
        });
    };
}

export function updateFormData(key, value) {
    return {
        type: types.UPDATE_FORM_DATA,
        payload: {key: key, value: value}
    }
}

export function saveSettings(cb) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const { jwt, loggedInUser } = getState().appState;
        const {
            selected_calendar,
            consultation_method,
            skype_username,
            phone_number,
            meeting_location,
            first_name,
            last_name,
            email,
            organization_name,
            organization_website,
            organization_paypal_account_email
        } = getState().settings.formData;

        // make put for user
        fetch(`${API_ENDPOINT}/users/${loggedInUser.id}` , {
            method: 'put',
            mode: 'cors',
            body: JSON.stringify({
                consultation_method: consultation_method,
                skype_username: skype_username,
                phone_number: phone_number,
                meeting_location: meeting_location,
                first_name: first_name,
                last_name: last_name,
                email: email,
                selected_calendar: selected_calendar
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        })
        .then(() => {
            return fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}` , {
                method: 'put',
                mode: 'cors',
                body: JSON.stringify({
                    name: organization_name,
                    website: organization_website,
                    paypal_account_email: organization_paypal_account_email
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                }
            })
        })
        .then(() =>{
            dispatch(settingsSaved());
            dispatch(doneLoading());
            if (cb) cb();
            else dispatch(sendSuccessNotification('settings saved successfully!'));
        })
        .catch(error => {
            console.log(error);
            dispatch(settingsSaved());
            dispatch(doneLoading());
            dispatch(sendErrorNotification('Ugh oh! Something went wrong. Try again!'));
        });
    };
}

function settingsSaved() {
    return {
        type: types.SETTINGS_SAVED
    }
}

function settingsLoaded(settings) {
    return {
        type: types.SETTINGS_LOADED,
        payload: settings
    }
}