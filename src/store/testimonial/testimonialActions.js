import { removeTestimonial, replaceData, updateTestimonial } from "./testimonialSlice";
import { showNotificationMessage } from "../uiSlice";
import axios from "axios";

export const fetchTestimonialData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/testimonials`
      );
      const data = await res.data.data;

      dispatch(replaceData(data));
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: "Sending Request Failed!",
        })
      );
    }
  };
};

export const createTestimonialData = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/testimonials`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(fetchTestimonialData());
      dispatch(
        showNotificationMessage({
          open: false,
        })
      );
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.message ? error.message : "Sending testimonial Failed!",
        })
      );
    }
  };
};

export const updateTestimonialData = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/testimonials/${data.id}`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      console.log(data)
      dispatch(updateTestimonial(data));
      dispatch(
        showNotificationMessage({
          open: false,
        })
      );
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.message ? error.message : "Updating testimonial Failed!",
        })
      );
    }
  };
};

export const deleteTestimonialData = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/testimonials/${id}`
      );
      dispatch(removeTestimonial(id));
      dispatch(
        showNotificationMessage({
          open: false,
        })
      );
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.message ? error.message : "Deleting testimonial Failed!",
        })
      );
    }
  };
};
