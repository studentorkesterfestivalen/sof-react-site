import api from '../api/axiosInstance';
import { openDialog } from './dialog';
import { resetCart } from './cart';

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

export function stripePurchase(stripe_id) {
  console.log("Enter stripe Purchase");
  console.log(stripe_id)
  return dispatch => {
    dispatch(stripePurchaseBegin());
    return api.post('/store/charge', { stripe_token: stripe_id}, { timeout:1000 * 10})
    .then (json => {
      dispatch(stripePurchaseSuccess(json.data));
      dispatch(resetCart());
       dispatch(openDialog("Payment Success", "Your items can be found on your profile page!"));
      return json.data;
    })
    .catch(error => {
      dispatch(stripePurchaseFailure(error));
      dispatch(openDialog("Payment Error", "Could not perform purchase."));
    });
  };
};

export const STRIPE_PURCHASE_BEGIN   = 'STRIPE_PURCHASE_BEGIN';
export const STRIPE_PURCHASE_FAILURE = "STRIPE_PURCHASE_FAILURE";
export const STRIPE_PURCHASE_SUCCESS = "STRIPE_PURCHASE_SUCCESS";
export const STRIPE_RESET            = "STRIPE_RESET";

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

export const stripeReset = () => ({
  type: STRIPE_RESET
})
