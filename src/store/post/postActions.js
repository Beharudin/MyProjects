import axios from "axios";
import { showNotificationMessage } from "../uiSlice";
import { removeFromPost, replaceData, updatePost } from "./postSlice";

export const fetchPostData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts`
      );
      const data = await res.data.data;

      dispatch(replaceData(data));
      await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com//posts.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
    } catch (error) {
      const errData = error.response.data;
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message:
            error.code === "ERR_BAD_RESPONSE"
              ? "Server is not running, please try again later!"
              : errData.message
              ? errData.message
              : "Something went wrong, please try again later!",
        })
      );
    }
  };
};

export const createPostData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(
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
          open: true,
          message: "Video Added Successfully!",
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
