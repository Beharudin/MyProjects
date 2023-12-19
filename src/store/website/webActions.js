import { replaceData, updateWebInfo } from "./webSlice";
import { showNotificationMessage } from "../uiSlice";
import axios from "axios";

export const fetchWebInfoData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/website`
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

export const updateWebInfoData = (data) => {
  return async (dispatch) => {
    try {
      console.log("web data", data);
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/website/${data.id}`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(updateWebInfo(data));
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
