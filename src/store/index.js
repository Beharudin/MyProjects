import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/authSlice";
import novelSlice from "./novel/novelSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    novel: novelSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
