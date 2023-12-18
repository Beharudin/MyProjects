import { removeFromPost, replaceData, updatePost } from "./postSlice";
import { showNotificationMessage } from "../uiSlice";
import axios from "axios";

export const fetchPostData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts`
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

export const createPostData = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(fetchPostData());
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
          message: error.message ? error.message : "Sending post Failed!",
        })
      );
    }
  };
};

export const updatePostData = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts/${data.id}`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(updatePost(data));
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
          message: error.message ? error.message : "Updating post Failed!",
        })
      );
    }
  };
};

export const deletePostData = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts/${id}`
      );
      dispatch(removeFromPost(id));
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
          message: error.message ? error.message : "Deleting post Failed!",
        })
      );
    }
  };
};
