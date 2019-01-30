import { combineReducers } from 'redux';
import locale from './locale';
import mobile from './mobile';

export default combineReducers({
    locale,
    mobile,
})