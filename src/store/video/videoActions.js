import axios from "axios";
import { showNotificationMessage } from "../uiSlice";
import { removeFromVideo, replaceData, updateVideo } from "./videoSlice";

export const fetchVideoData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/videos`
      );
      const data = await res.data.data;

      dispatch(replaceData(data));
      await fetch(
        "https://bakkalcha-2e815-default-rtdb.firebaseio.com//videoes.json",
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

export const createVideoData = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/videos`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      dispatch(fetchVideoData());
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
          message: error.message ? error.message : "Sending video Failed!",
        })
      );
    }
  };
};

export const updateVideoData = (data) => {
  return async (dispatch) => {
    // try {
    //   await axios.patch(
    //     `${process.env.REACT_APP_BACKEND_BASE_URL}/api/videos/${data.id}`,

    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "Application/json",
    //       },
    //     }
    //   );

    //   dispatch(updateVideo(data));
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
    //       message: error.message ? error.message : "Updating video Failed!",
    //     })
    //   );
    // }
  };
};

export const deleteVideoData = (id) => {
  return async (dispatch) => {
    // try {
    //   await axios.delete(
    //     `${process.env.REACT_APP_BACKEND_BASE_URL}/api/videos/${id}`
    //   );
    //   dispatch(removeFromVideo(id));
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
    //       message: error.message ? error.message : "Deleting video Failed!",
    //     })
    //   );
    // }
  };
};
