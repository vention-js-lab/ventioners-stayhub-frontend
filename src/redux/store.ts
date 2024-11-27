import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;

export default store;
