import * as types from '../types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function getDraftRooms() {
  return dispatch => {
    fetch(`${API_ENDPOINT}/rooms`, {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
      // turn response into json
      return response.json();
    })
    .then(response => {
      dispatch(showDraftRooms(response));
    })
    .catch(error => {
        console.log(error.message);
        // if can't auth user, logout and send to login page
    });
  }
}

function showDraftRooms(rooms) {
  return {
    type: types.GET_DRAFT_ROOMS,
    payload: rooms
  }
}
