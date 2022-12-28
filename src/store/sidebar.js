import { createSlice } from "@reduxjs/toolkit";

const initialSbState = {
  option: "dashboard",
};

const sbSlice = createSlice({
  name: "sb",
  initialState: initialSbState,
  reducers: {
    switch: (state, action) => {
      state.option = action.payload.option;
    },
  },
});
export default sbSlice;
export const sbActions = sbSlice.actions;
