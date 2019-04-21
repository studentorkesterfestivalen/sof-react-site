import api from '../api/axiosInstance';
import { addProdToLocalStorage } from '../api/shopCalls'

export const POST_PRODUCT_BEGIN   = 'POST_PRODUCT_BEGIN';
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE';

export const postProductBegin = () => ({
    type: POST_PRODUCT_BEGIN
});

export const postProductSuccess = () => ({
    type: POST_PRODUCT_SUCCESS,
});

export const  postProductFailure = error => ({
    type: POST_PRODUCT_FAILURE,
    payload: { error }
});

export function postProductToCart(prod) {
  return dispatch => {
    addProdToLocalStorage(prod);
    dispatch(postProductBegin())
    return api.put('/cart/item', {
      item: { product_id : prod.product_id }
    })
      .then( res => {
        console.log('put item in cart on backend')
        dispatch(postProductSuccess());
      }
      ).catch( err => {
        dispatch(postProductFailure(err))
        console.log(err);
      });
  }
}

export const FETCH_CART_BEGIN   = 'FETCH_CART_BEGIN';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const fetchCartBegin = () => ({
    type: FETCH_CART_BEGIN
});

export const fetchCartSuccess = product => ({
    type: FETCH_CART_SUCCESS,
    payload: product
});

export const fetchCartFailure = error => ({
    type: FETCH_CART_FAILURE,
    payload: { error }
});

export function fetchCart() {
  return dispatch => {
    dispatch(fetchCartBegin())
    return api.get('/cart', { timeout: 0})
      .then( res => {
        console.log(res)
        dispatch(fetchCartSuccess(res))
      }
      ).catch( err => {
        dispatch(fetchCartFailure(err))
        console.log(err);
      });
  }
}

export const DELETE_PRODUCT_BEGIN   = 'DELETE_PRODUCT_BEGIN';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const deleteProdBegin = () => ({
  type: FETCH_CART_BEGIN
});

export const deleteProdSuccess = product => ({
  type: FETCH_CART_SUCCESS,
  payload: product
});

export const deleteProdFailure = error => ({
  type: FETCH_CART_FAILURE,
  payload: { error }
})

export function deleteCartItem(prod) {
  return dispatch => {
    dispatch(fetchCartBegin())
    return api.delete('/cart')
      .then( res => {

        dispatch(deleteProdSuccess(res))
      }
      ).catch( err => {
        dispatch(deleteProdFailure(err))
        console.log(err);
      });
  }
}