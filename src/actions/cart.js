import api from '../api/axiosInstance';
import { addProdToLocalStorage } from '../api/shopCalls'

export const ADD_PRODUCT_BEGIN   = 'ADD_PRODUCT_BEGIN';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
export const ADD_PRODUCT_NO_LOGIN = 'ADD_PRODUCT_NO_LOGIN';

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
  return (dispatch, getState) => {
    const state = getState();
    const isLoggedIn = state.reduxTokenAuth.currentUser.isSignedIn;
    //addProdToLocalStorage(prod);
    dispatch(addProductBegin(prodID))
    if(isLoggedIn){
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
}
export const REMOVE_PRODUCT_BEGIN   = 'REMOVE_PRODUCT_BEGIN';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_FAILURE = 'REMOVE_PRODUCT_FAILURE';
export const REMOVE_PRODUCT_NO_LOGIN = 'REMOVE_PRODUCT_NO_LOGIN';

export const removeProdBegin = prodID => ({
  type: REMOVE_PRODUCT_BEGIN,
  payload: prodID
});

export const removeProdSuccess = () => ({
  type: REMOVE_PRODUCT_SUCCESS,
});

export const removeProdFailure = (error, prodID) => ({
  type: REMOVE_PRODUCT_FAILURE,
  payload: [ error, prodID ]
})

export function removeProductFromCart(prodID) {
  return (dispatch, getState) => {
    const state = getState();
    const isLoggedIn = state.reduxTokenAuth.currentUser.isSignedIn;
    dispatch(removeProdBegin(prodID))
    if(isLoggedIn){
      return api.delete('/cart/item', {
        data: {item: {product_id: prodID}}
      })
        .then( res => {
          dispatch(removeProdSuccess())
        }
        ).catch( err => {
          dispatch(removeProdFailure(err, prodID))
          console.log(err);
        });
    }
  }
}

export const FETCH_CART_BEGIN   = 'FETCH_CART_BEGIN';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const fetchCartBegin = () => ({
    type: FETCH_CART_BEGIN
});

export const fetchCartSuccess = cart => ({
    type: FETCH_CART_SUCCESS,
    payload: cart
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

