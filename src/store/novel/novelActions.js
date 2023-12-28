import axios from "axios";
import { showNotificationMessage } from "../uiSlice";
import { removeFromNovel, replaceData, updateNovel } from "./novelSlice";

export const fetchNovelData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/novels`
      );
      const data = await res.data.data;

      dispatch(replaceData(data));
      await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com//novels.json",
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

export const createNovelData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/novels`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(fetchNovelData());
      dispatch(
        showNotificationMessage({
          open: true,
          message: "Novel Added Successfully!",
        })
      );
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.message ? error.message : "Sending Novel Failed!",
        })
      );
    }
  };
};

export const updateNovelData = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/novels/${data.id}`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(updateNovel(data));
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
          message: error.message ? error.message : "Updating Novel Failed!",
        })
      );
    }
  };
};

export const deleteNovelData = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/novels/${id}`
      );
      dispatch(removeFromNovel(id));
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
          message: error.message ? error.message : "Deleting Novel Failed!",
        })
      );
    }
  };
};
