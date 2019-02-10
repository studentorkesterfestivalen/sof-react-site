import api from '../api/axiosInstance';
import axios from 'axios';

export const FETCH_ORCHESTRA_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_ORCHESTRA_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_ORCHESTRA_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchOrchestraBegin = () => ({
    type: FETCH_ORCHESTRA_BEGIN
});

export const fetchOrchestraSuccess = orchestras => ({
    type: FETCH_ORCHESTRA_SUCCESS,
    payload: orchestras
});

export const fetchOrchestraFailure = error => ({
    type: FETCH_ORCHESTRA_FAILURE,
    payload: { error }
});
//    /orchestra/list_all`,

export function fetchOrchestras() {
    return dispatch => {
      dispatch(fetchOrchestraBegin());
      return api.get(`/orchestra`)
        //.then(handleErrors)
        .then(json => {
          console.log("got this json: " + json.data);
          dispatch(fetchOrchestraSuccess(json.data));
          return json.data;
        })
        .catch(error => dispatch(fetchOrchestraFailure(error)));
    };
  }
//   // Handle HTTP errors since fetch won't.
//   function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }
