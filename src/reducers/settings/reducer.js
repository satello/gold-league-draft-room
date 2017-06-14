import * as types from './actionTypes';

const initialState = {
    hasLoaded: false,
    hasBeenUpdated: false,
    formData: {
        consultation_method: '',
        skype_username: '',
        phone_number: '',
        meeting_location: '',
        first_name: '',
        last_name: '',
        email: '',
        organization_name: '',
        organization_website: '',
        organization_paypal_account_email: '',
        selected_calendar: '',
        google_calendars: []
    },
    errors: {
        consultation_method: '',
        skype_username: '',
        phone_number: '',
        meeting_location: '',
        first_name: '',
        last_name: '',
        email: '',
        organization_name: '',
        organization_website: '',
        organization_paypal_account_email: ''
    }
};

export default function settings(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_FORM_DATA:
            const oldFormData = Object.assign({}, state.formData, {
                [action.payload.key]: action.payload.value
            });
            return Object.assign({}, state, {
                formData: oldFormData,
                hasBeenUpdated: true
            });
        case types.SETTINGS_SAVED:
            return Object.assign({}, state, {
                hasBeenUpdated: false
            });
        case types.SETTINGS_LOADED:
            let hasBeenUpdated = false;
            if (action.payload.emailFromPaypal) hasBeenUpdated = true;
            delete action.payload.emailFromPaypal;
            return Object.assign({}, state, {
                hasLoaded: true,
                hasBeenUpdated: hasBeenUpdated,
                formData: action.payload
            });
        default:
            return state;
    }
}