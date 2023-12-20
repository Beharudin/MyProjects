import axios from "axios";
import { login, replaceData, tokenLogin } from "./authSlice";
import { showNotificationMessage } from "../uiSlice";
import { cookies } from "../../index";

export const sendUserData = (data, navigate, path) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "warning",
          message: "Sending Request to Database!",
        })
      );
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`,

        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      dispatch(
        showNotificationMessage({
          open: true,
          type: "success",
          message: res.data
            ? res.data.message
            : "Request Sent Successfully to Database!",
        })
      );
      navigate(path);
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.response.data
            ? error.response.data.message
            : "Sending Request Failed!",
        })
      );
    }
  };
};

export const updateUserData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "warning",
          message: "Sending Request to Database!",
        })
      );
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/update`,
        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const newData = await res.data;

      if (newData.success === 0) {
        dispatch(
          showNotificationMessage({
            open: true,
            type: "error",
            message: newData.message
              ? newData.message
              : "User Update Request Failed!",
          })
        );
      } else {
        dispatch(replaceData(newData));
        cookies.remove("token");
        cookies.set("token", newData.accessToken, { path: "/" });

        dispatch(
          showNotificationMessage({
            open: true,
            type: "success",
            message: res.data
              ? res.data.message
              : "Request Sent Successfully to Database!",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.response.data
            ? error.response.data.message
            : "Sending Request Failed!",
        })
      );
    }
  };
};

export const updateUserPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "warning",
          message: "Sending Request to Database!",
        })
      );
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/updatePwd`,
        data,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const newData = await res.data;

      if (newData.success === 0) {
        dispatch(
          showNotificationMessage({
            open: true,
            type: "error",
            message: newData.message
              ? newData.message
              : "User Update Request Failed!",
          })
        );
      } else {
        dispatch(
          showNotificationMessage({
            open: true,
            type: "success",
            message: res.data
              ? res.data.message
              : "Request Sent Successfully to Database!",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.response.data
            ? error.response.data.message
            : "Sending Request Failed!",
        })
      );
    }
  };
};

export const loginUser = (credentials, navigate, path) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/login`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await res.data;
      if (data.success === 0) {
        dispatch(
          showNotificationMessage({
            open: true,
            type: "error",
            message: data.message ? data.message : "Login Request Failed!",
          })
        );
      } else {
        dispatch(
          showNotificationMessage({
            open: false,
          })
        );
        dispatch(login(data));
        navigate(path, { replace: true });
        cookies.remove("token");
        cookies.set("token", data.accessToken, { path: "/" });
      }
    } catch (error) {
      dispatch(
        showNotificationMessage({
          open: true,
          type: "error",
          message: error.response.data
            ? error.response.data.message
            : "Sending Request Failed!",
        })
      );
    }
  };
};

export const verifyToken = (token, navigate, path) => {
  return async (dispatch) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(tokenLogin());
      navigate(path, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
};
