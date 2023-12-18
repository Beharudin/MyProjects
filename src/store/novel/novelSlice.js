import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  novelsList: [],
  changed: false,
};

const novelSlice = createSlice({
  name: "novel",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.novelsList = action.payload;
    },
    updateNovel(state, action) {
      state.changed = true;
      const updatedNovel=action.payload;

      const index = state.novelsList.findIndex(
        (novel) => novel.id === action.payload.id
      );

      if (index !== -1) {
        state.novelsList.splice(index, 1);
        state.novelsList.splice(index, 0, updatedNovel);
      }
    },
    removeFromNovel(state, action) {
      state.changed = true;
      
      const index = state.novelsList.findIndex(
        (novel) => novel.id === action.payload
      );

        state.novelsList.splice(index, 1);
    },
  },
});

export const { removeFromNovel, updateNovel, replaceData} =
  novelSlice.actions;
export default novelSlice;