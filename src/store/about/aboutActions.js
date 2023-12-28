import { replaceData, updateAbout } from "./aboutSlice";
import { showNotificationMessage } from "../uiSlice";
import axios from "axios";

export const fetchAboutData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/about`
      );
      const data = await res.data.data;

      dispatch(replaceData(data[0]));
      await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com//about.json",
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

export const updateAboutData = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/about`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(updateAbout(data));
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
          message: error.message ? error.message : "Updating About Failed!",
        })
      );
    }
  };
};
