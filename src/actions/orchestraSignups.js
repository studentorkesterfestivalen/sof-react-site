import api from '../api/axiosInstance';

export const FETCH_SIGNUPS_BEGIN   = 'FETCH_SIGNUPS_BEGIN';
export const FETCH_SIGNUPS_SUCCESS = 'FETCH_SIGNUPS_SUCCESS';
export const FETCH_SIGNUPS_FAILURE = 'FETCH_SIGNUPS_FAILURE';

export const fetchSignUpsBegin = () => ({
    type: FETCH_SIGNUPS_BEGIN
}); 

export const fetchSignUpsSuccess = orchestras => ({
    type: FETCH_SIGNUPS_SUCCESS,
    payload: orchestras
}); 

export const fetchSignUpsFailure = error => ({
    type: FETCH_SIGNUPS_FAILURE,
    payload: { error }
}); 

export function fetchSignUps(id) {
    return dispatch => {
      
      dispatch(fetchSignUpsBegin());
      return api.get(`orchestra/all_signups/?id=${id}`
    )
        //.then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch(fetchSignUpsSuccess({ id : json.orchestras}));
          return json.orchestras;
        })
        .catch(error => dispatch(fetchSignUpsFailure(error)));
    };
  }
  
//   // Handle HTTP errors since fetch won't.
//   function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }