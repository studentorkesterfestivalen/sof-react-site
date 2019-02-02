import { combineReducers } from 'redux';
import locale from './locale';
import mobile from './mobile';
import { reduxTokenAuthReducer } from 'redux-token-auth'

export default combineReducers({
    locale,
    mobile,
    reduxTokenAuth: reduxTokenAuthReducer,
})
