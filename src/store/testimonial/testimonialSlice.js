import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonialsList: [],
  changed: false,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.testimonialsList = action.payload;
    },
    updateTestimonial(state, action) {
      state.changed = true;
      const updatedTestimonial=action.payload;

      const index = state.testimonialsList.findIndex(
        (testimonial) => testimonial.id === action.payload.id
      );

      if (index !== -1) {
        state.testimonialsList.splice(index, 1);
        state.testimonialsList.splice(index, 0, updatedTestimonial);
      }
    },
    removeTestimonial(state, action) {
      state.changed = true;

      const index = state.testimonialsList.findIndex(
        (testimonial) => testimonial.id === action.payload
      );

        state.testimonialsList.splice(index, 1);
    },
  },
});

export const { removeTestimonial, updateTestimonial, replaceData} =
  testimonialSlice.actions;
export default testimonialSlice;
