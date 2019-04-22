import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../actions/shop';

const initialShopState = {
  products: null,
  loading: false,
  error: null,
};

export default function shopReducer(state = { ...initialShopState }, action) {
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload 
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: []
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
