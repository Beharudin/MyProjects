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
    tokenLogin(state) {
      state.isLoggedIn = true;
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

export const { login, register, logout, replaceData, tokenLogin } = AuthSlice.actions;
export default AuthSlice;
