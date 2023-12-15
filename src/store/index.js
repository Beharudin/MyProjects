import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import novelSlice from "./novelSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    novel: novelSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
