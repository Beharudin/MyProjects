import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth/authSlice";
import novelSlice from "./novel/novelSlice";
import uiSlice from "./uiSlice";
import poemSlice from "./poem/poemSlice";
import postSlice from "./post/postSlice";
import videoSlice from "./video/videoSlice";
import aboutSlice from "./about/aboutSlice";
import testimonialSlice from "./testimonial/testimonialSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    novel: novelSlice.reducer,
    poem: poemSlice.reducer,
    post: postSlice.reducer,
    video: videoSlice.reducer,
    about: aboutSlice.reducer,
    testimonial: testimonialSlice.reducer,
    website: novelSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
