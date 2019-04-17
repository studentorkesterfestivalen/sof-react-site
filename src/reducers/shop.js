import { 
  FETCH_CART_BEGIN,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  POST_PRODUCT_BEGIN,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILURE,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../actions/shop'

const initialShopState = {
  cart: {},
  loading: false,
  error: null,
};

export default function shopReducer(state = {...initialShopState }, action) {
  switch (action.type) {
    case FETCH_CART_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    case FETCH_CART_FAILURE:
      return {...state,
        loading: false,
        error: action.payload.error,
        };
    case POST_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case POST_PRODUCT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case DELETE_PRODUCT_BEGIN:
      return { 
        ...state,
        loading: true
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state, 
        loading: false
      }
    default: 
      return state;
  }  
}