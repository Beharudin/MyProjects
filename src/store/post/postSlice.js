import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
  changed: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.postsList = action.payload;
    },
    updatePost(state, action) {
      state.changed = true;
      const updatedPost=action.payload;

      const index = state.postsList.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.postsList.splice(index, 1);
        state.postsList.splice(index, 0, updatedPost);
      }
    },
    removeFromPost(state, action) {
      state.changed = true;

      const index = state.postsList.findIndex(
        (post) => post.id === action.payload
      );

        state.postsList.splice(index, 1);
    },
  },
});

export const { removeFromPost, updatePost, replaceData} =
  postSlice.actions;
export default postSlice;
