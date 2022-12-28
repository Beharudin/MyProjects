import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import uiSlice from "./ui";
import sbSlice from "./sidebar";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    sb: sbSlice.reducer,
  },
});
export default store;
