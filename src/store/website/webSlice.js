import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  webInfo:{},
  changed: false,
};

const webInfoSlice = createSlice({
  name: "webInfo",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.webInfo = action.payload;
    },
    updateWebInfo(state, action) {
      state.changed = true;
      state.webInfo=action.payload;  
    },
  },
});

export const { updateWebInfo, replaceData} =
  webInfoSlice.actions;
export default webInfoSlice;
