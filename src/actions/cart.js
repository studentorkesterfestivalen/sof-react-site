import api from '../api/axiosInstance';
import { addProdToLocalStorage } from '../api/shopCalls'

export const ADD_PRODUCT_BEGIN   = 'POST_PRODUCT_BEGIN';
export const ADD_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE';

export const addProductBegin = prodID => ({
  type: ADD_PRODUCT_BEGIN,
  payload: prodID
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS
});

export const  addProductFailure = (error, prodID) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: [error, prodID]
});

export function addProductToCart(prodID) {
  return dispatch => {
    //addProdToLocalStorage(prod);
    dispatch(addProductBegin(prodID))
    return api.put('/cart/item', {
      item: { product_id : prodID }
    })
      .then( res => {
        console.log('put item in cart on backend')
        dispatch(addProductSuccess());
      }
      ).catch( err => {
        dispatch(addProductFailure(err, prodID))
        console.log(err);
      });
  }
}
export const REMOVE_PRODUCT_BEGIN   = 'DELETE_PRODUCT_BEGIN';
export const REMOVE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const removeProdBegin = () => ({
  type: FETCH_CART_BEGIN
});

export const removeProdSuccess = product => ({
  type: FETCH_CART_SUCCESS,
  payload: product
});

export const removeProdFailure = error => ({
  type: FETCH_CART_FAILURE,
  payload: { error }
})

export function removeProductFromCart(prod) {
  return dispatch => {
    dispatch(removeProdBegin())
    return api.delete('/cart')
      .then( res => {
        dispatch(removeProdSuccess(res))
      }
      ).catch( err => {
        dispatch(removeProdFailure(err))
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

