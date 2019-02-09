import api from '../api/axiosInstance';

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

export function fetchOrchestras() {
    return dispatch => {
      dispatch(fetchOrchestraBegin());
      return api.get(`/orchestra/all_orchestras`
    )
        //.then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchOrchestraSuccess(json.orchestras));
          return json.orchestras;
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