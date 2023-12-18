import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id:-1,
  description: null,
  img: null,
  changed: false,
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.id = action.payload.id;
      state.description = action.payload.description;
      state.img = action.payload.img;
    },
    updateAbout(state, action) {
      state.changed = true;
      state.id = action.payload.id;
      state.description = action.payload.description;
      state.img = action.payload.img;  
    },
  },
});

export const { updateAbout, replaceData } = aboutSlice.actions;
export default aboutSlice;
