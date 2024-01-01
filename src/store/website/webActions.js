import { replaceData, updateWebInfo } from "./webSlice";
import { showNotificationMessage } from "../uiSlice";
import axios from "axios";

export const fetchWebInfoData = () => {
  return async (dispatch) => {
    try {
      // const res = await axios.get(
      //   `${process.env.REACT_APP_BACKEND_BASE_URL}/api/website`
      // );
      // const data = await res.data.data;
      
      // dispatch(replaceData(data[0]));
      // await fetch(
      //   "https://bakkalcha-2e815-default-rtdb.firebaseio.com//webInfo.json",
      //   {
      //     method: "PUT",
      //     body: JSON.stringify(data[0]),
      //     headers: {
      //       "Content-Type": "Application/json",
      //     },
      //   }
      // );
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

export const updateWebInfoData = (data) => {
  return async (dispatch) => {
    // try {
    //   console.log("web data", data);
    //   await axios.patch(
    //     `${process.env.REACT_APP_BACKEND_BASE_URL}/api/website/${data.id}`,

    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "Application/json",
    //       },
    //     }
    //   );
    //   dispatch(updateWebInfo(data));
    //   dispatch(
    //     showNotificationMessage({
    //       open: false,
    //     })
    //   );
    // } catch (error) {
    //   dispatch(
    //     showNotificationMessage({
    //       open: true,
    //       type: "error",
    //       message: error.message ? error.message : "Updating post Failed!",
    //     })
    //   );
    // }
  };
};
