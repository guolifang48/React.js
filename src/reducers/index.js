import { combineReducers } from 'redux';
import  auth from './auth';
import  auth from './chat';
import  events from './events';
import  users from './users';

const rootReducer = combineReducers({
    auth,
    chat,
    events,
    users
})

export default rootReducer