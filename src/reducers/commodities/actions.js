import * as types from './actionTypes';

import { startLoading, doneLoading, sendErrorNotification } from '../app/actions';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function loadCommodities() {
    return (dispatch, getState) => {
        console.log("LOADING COMMODITIES");
        const { jwt, loggedInUser }  = getState().appState;

        dispatch(startLoading());
        dispatch(loadCommodity());

        fetch(`${API_ENDPOINT}/organizations/${loggedInUser.organization.id}/commodities` , {
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
        }).then(commodities => {
            if (commodities.error) throw Error(commodities.error);
            console.log(commodities);
            dispatch(commoditiesLoaded(commodities));
            dispatch(doneLoading());
        }).catch(error => {
            console.log("shouldn't be here");
            console.log(error);
            const errMsg = error.message === 'Failed to fetch' ? 'Ugh oh! We couldn\'t load your information. ' +
            'Please try again!' : error.message;
            dispatch(doneLoading());
            dispatch(commoditiesLoaded());
            dispatch(sendErrorNotification(errMsg));
        });
    };
}

function commoditiesLoaded(commodities) {
    return {
        type: types.COMMODITIES_DETAILS_LOADED,
        payload: commodities
    }
}

function loadCommodity() {
    return {
        type: types.LOAD_COMMODITIES
    }
}
