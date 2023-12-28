import axios from "axios";
import { showNotificationMessage } from "../uiSlice";
import { removeFromPoem, replaceData, updatePoem } from "./poemSlice";

export const fetchPoemData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/poems`
      );
      const data = await res.data.data;

      dispatch(replaceData(data));
      await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com//poems.json",
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

export const createPoemData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/poems`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(fetchPoemData());
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
          message: error.message ? error.message : "Sending poem Failed!",
        })
      );
    }
  };
};

export const updatePoemData = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/poems/${data.id}`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(updatePoem(data));
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
          message: error.message ? error.message : "Updating poem Failed!",
        })
      );
    }
  };
};

export const deletePoemData = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/poems/${id}`
      );
      dispatch(removeFromPoem(id));
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
          message: error.message ? error.message : "Deleting poem Failed!",
        })
      );
    }
  };
};
