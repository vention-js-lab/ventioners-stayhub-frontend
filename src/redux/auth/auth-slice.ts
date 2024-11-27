import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '#/interfaces';
import { type ApplicationState } from '../store';

type AuthState = {
  user: User | null;
  loggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { createUser, removeUser } = authSlice.actions;
export const selectAuth = (state: ApplicationState) => state.auth;
