import axios from "axios";
import { showNotificationMessage } from "../uiSlice";
import { removeFromPost, replaceData, updatePost } from "./postSlice";

export const fetchPostData = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com/posts.json"
      );
      const data = await res.json();

      dispatch(replaceData(data));
      
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


export const sendPostData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "warning",
          message: "Sending Request to Database!",
        })
      );
      const res = await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com/posts.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      const resData = await res.json();
      dispatch(
        showNotificationMessage({
          open: true,
          type: "success",
          message: "Request Sent Successfully to Database!",
        })
      );
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