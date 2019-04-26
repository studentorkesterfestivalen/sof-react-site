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
      }, {timeout: 1000 * 10})
        .then( res => {
          dispatch(addProductSuccess());
        }
        ).catch( err => {
          dispatch(addProductFailure(err, prodID))
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
      }, {timeout: 1000 * 10})
        .then( res => {
          dispatch(removeProdSuccess())
        }
        ).catch( err => {
          dispatch(removeProdFailure(err, prodID))
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
        dispatch(fetchCartSuccess(res))
      }
      ).catch( err => {
        dispatch(fetchCartFailure(err))
      });
  }
}

export const PUSH_CART_BEGIN   = 'PUSH_CART_BEGIN';
export const PUSH_CART_SUCCESS = 'PUSH_CART_SUCCESS';
export const PUSH_CART_FAILURE = 'PUSH_CART_FAILURE';

export const pushCartBegin = () => ({
  type: PUSH_CART_BEGIN
});
export const pushCartSuccess = () => ({
  type: PUSH_CART_SUCCESS
});
export const pushCartFailure = error => ({
  type: PUSH_CART_FAILURE,
  payload: { error }
});

export function pushCart() {
  return (dispatch, getState) => {
    const state = getState();
    const cartItems = [];
    Object.keys(state.cart.cart).forEach( key => {
      cartItems.push({product_id: key, amount: state.cart.cart[key]});
    });

    if(cartItems.length > 0) {
      dispatch(pushCartBegin())
      return api.put('/cart', {
        cart: {items: cartItems}
      })
        .then( res => {
          dispatch(pushCartSuccess())
        }
        ).catch( err => {
          dispatch(pushCartFailure(err))
        });
    }
    else{
      return false
    }
  }
}

export const RESET_CART = 'RESET_CART';

export const resetCart = () => ({
  type: RESET_CART
});
