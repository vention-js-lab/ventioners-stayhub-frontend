import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '#/entities';

type AuthState = {
  user: User | null;
  loggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  loggedIn: false,
};

const authSlice = createSlice({
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

export default authSlice;
