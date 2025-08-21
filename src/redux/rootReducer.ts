import { combineReducers } from '@reduxjs/toolkit';
import userDetailsReducer from './reducers/userReducer';
import cafeReducer from './reducers/cafeReducer';

export const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  cafes: cafeReducer,
});
