import { combineReducers } from 'redux';

//Reducer
import userReducer from './userReducer';

export default combineReducers({
    userReducer: userReducer
});