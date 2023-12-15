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
    addToNovels(state, action) {
      state.changed = true;
      const newNovel = action.payload;
    
        state.novelsList.push({
          id: newNovel.id,
          topic: newNovel.topic,
          section: newNovel.section,
          body: newNovel.body,
        });
  
    },
    removeFromNovel(state, action) {
      state.changed = true;
      const existingNovel = state.novelsList.find(
        (novel) => novel.id === action.payload
      );
      const index = state.novelsList.findIndex(
        (novel) => novel.id === action.payload
      );

        state.novelsList.splice(index, 1);
    },
  },
});

export const { addToNovels, removeFromNovel, replaceData} =
  novelSlice.actions;
export default novelSlice;
