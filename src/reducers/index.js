import { combineReducers } from 'redux';
import locale from './locale';
import mobile from './mobile';
import orchestras from './orchestras';
import login from './login';

import { reduxTokenAuthReducer } from 'redux-token-auth'

export default combineReducers({
  locale,
  mobile,
  orchestras,
  login,
  reduxTokenAuth: reduxTokenAuthReducer,
})
