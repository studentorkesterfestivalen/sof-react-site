import api from '../api/axiosInstance';

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_ORCHESTRA_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_ORCHESTRA_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_ORCHESTRA_FAILURE';

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = response => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: response
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return api.get(`/shopping_product`)
    //.then(handleErrors)
      .then(json => {
        dispatch(fetchProductsSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
