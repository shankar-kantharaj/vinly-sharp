import { combineReducers } from '@reduxjs/toolkit';
import userDetailsReducer from './reducers/userReducer';
import cafeReducer from './reducers/cafeReducer';
import filterReducer from './reducers/filterReducer';

export const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  cafes: cafeReducer,
  filter: filterReducer, 
});
