import * as types from './actionTypes';

const initialState = {
    hasLoaded: false,
    hasBeenUpdated: false,
    formData: {
        id: null,
        uuid: null,
        name: '',
        subdomain: '',
        price_per_meeting: '',
        meeting_length: '',
        meeting_padding: 0,
        timezone: ''
    },
    showEmbedCode: false
};

export default function calendar(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOAD_CALENDAR:
            return Object.assign({}, state, {
                hasLoaded: false
            });
        case types.UPDATE_CALENDAR_DETAILS:
            const newFormData = Object.assign({}, state.formData, {
                [action.payload.key]: action.payload.value
            });
            return Object.assign({}, state, {
                formData: newFormData,
                hasBeenUpdated: true
            });
        case types.CALENDAR_DETAILS_LOADED:
            return Object.assign({}, state, {
                hasLoaded: true,
                hasBeenUpdated: false,
                formData: action.payload
            });
        case types.CALENDAR_SAVED:
            return Object.assign({}, state, {
                hasBeenUpdated: false
            });
        case types.TOGGLE_EMBED_CODE:
            return Object.assign({}, state, {
                showEmbedCode: !state.showEmbedCode
            });
        default:
            return state;
    }
}
