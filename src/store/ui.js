import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  notif: {
    type: "",
    msg: "",
  },
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    notif: (state, action) => {
      state.notif.type = action.payload.type;
      state.notif.msg = action.payload.msg;
    },
    startLoad: (state) => {
      state.isLoading = true;
    },
    stopLoad: (state) => {
      state.isLoading = false;
    },
  },
});
export default uiSlice;
export const uiActions = uiSlice.actions;
