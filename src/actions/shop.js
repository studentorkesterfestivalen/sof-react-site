import api from '../api/axiosInstance';

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

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
    return api.get(`/shopping_product`, {timeout: 1000 * 10})
    //.then(handleErrors)
      .then(json => {
        dispatch(fetchProductsSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}


export const STRIPE_PURCHASE_BEGIN   = 'STRIPE_PURCHASE_BEGIN';
export const STRIPE_PURCHASE_FAILURE = "STRIPE_PURCHASE_FAILURE";
export const STRIPE_PURCHASE_SUCCESS = "STRIPE_PURCHASE_SUCCESS";

export const stripePurchaseBegin = () => ({
  type: STRIPE_PURCHASE_BEGIN
});

export const stripePurchaseFailure = (error) => ({
  type: STRIPE_PURCHASE_FAILURE,
  payload: { error }
});

export const stripePurchaseSuccess = response => ({
  type: STRIPE_PURCHASE_SUCCESS,
  payload: response
});
