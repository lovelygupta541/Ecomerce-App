import {combineReducers, configureStore, createActionCreatorInvariantMiddleware} from '@reduxjs/toolkit';
import productSlice from './slice/productSlice';
import cartsSlice from './slice/cartsSlice';

const combinedReducers = combineReducers({
  product: productSlice,
  cart: cartsSlice,
});

const rootReducers = (state, action) => {
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
