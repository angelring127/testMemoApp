import { combineReducers } from 'redux';
import labels from './labels';
import memos from './memos';

export default combineReducers({
    labels,
    memos,
});