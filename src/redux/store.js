import { combineReducers, configureStore } from '@reduxjs/toolkit';
import listSlice from './listSlice';

const rootReducer = combineReducers({
  list: listSlice,
});

export const store = configureStore({ reducer: rootReducer });
