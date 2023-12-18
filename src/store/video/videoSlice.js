import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videosList: [],
  changed: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.videosList = action.payload;
    },
    updateVideo(state, action) {
      state.changed = true;
      const updatedVideo=action.payload;

      const index = state.videosList.findIndex(
        (video) => video.id === action.payload.id
      );

      if (index !== -1) {
        state.videosList.splice(index, 1);
        state.videosList.splice(index, 0, updatedVideo);
      }
    },
    removeFromVideo(state, action) {
      state.changed = true;

      const index = state.videosList.findIndex(
        (video) => video.id === action.payload
      );

        state.videosList.splice(index, 1);
    },
  },
});

export const { removeFromVideo, updateVideo, replaceData} =
  videoSlice.actions;
export default videoSlice;
