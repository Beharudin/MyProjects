import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
  },
});

export const { login, register, logout, replaceData } = AuthSlice.actions;
export default AuthSlice;
