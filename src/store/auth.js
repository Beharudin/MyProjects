import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isLoggedIn: false, userData: {}, accessToken: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      state.accessToken = "";
    },
    pending: (state) => {
      state.isLoggedIn = "pending";
    },
  },
});
export default authSlice;
export const authActions = authSlice.actions;
