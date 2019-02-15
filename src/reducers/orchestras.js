import {
  FETCH_ORCHESTRA_BEGIN,
  FETCH_ORCHESTRA_SUCCESS,
  FETCH_ORCHESTRA_FAILURE,
  SET_ORCHESTRA_FROM_CODE
} from '../actions/orchestras';

import {
  FETCH_SIGNUPS_BEGIN,
  FETCH_SIGNUPS_SUCCESS,
  FETCH_SIGNUPS_FAILURE
} from '../actions/orchestraSignups';


const initialOrchestraState = {
  orchestras: [],
  loading: false,
  error: null,
  signUps: [],
  signupOrchestra: {}
};


export default function orchestraReducer(state = { initialOrchestraState }, action) {
  switch(action.type) {
    case FETCH_ORCHESTRA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ORCHESTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        orchestras: action.payload 
      };

    case FETCH_ORCHESTRA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orchestras: []
      };

    case FETCH_SIGNUPS_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SIGNUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        signUps: state.signUps.concat(action.payload)
      };

    case FETCH_SIGNUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    
    case SET_ORCHESTRA_FROM_CODE:
      return {
        ...state,
        signupOrchestra: action.payload
      }
      return 
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}