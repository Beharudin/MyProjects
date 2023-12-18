import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  poemsList: [],
  changed: false,
};

const poemSlice = createSlice({
  name: "poem",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.poemsList = action.payload;
    },
    updatePoem(state, action) {
      state.changed = true;
      const updatedPoem=action.payload;

      const index = state.poemsList.findIndex(
        (poem) => poem.id === action.payload.id
      );

      if (index !== -1) {
        state.poemsList.splice(index, 1);
        state.poemsList.splice(index, 0, updatedPoem);
      }
    },
    removeFromPoem(state, action) {
      state.changed = true;

      const index = state.poemsList.findIndex(
        (poem) => poem.id === action.payload
      );

        state.poemsList.splice(index, 1);
    },
  },
});

export const { removeFromPoem, updatePoem, replaceData} =
  poemSlice.actions;
export default poemSlice;
