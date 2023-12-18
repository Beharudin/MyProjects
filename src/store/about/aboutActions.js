import { replaceData, updateAbout} from "./aboutSlice";
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

