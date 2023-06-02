import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const login = (email, password, redirectPath, navigate) => {

  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        { email, password }
      );
      const token = response.data.token;
      // Dispatch a success action with the received token
      dispatch(loginSuccess(token));
      navigate(redirectPath, { replace: true });

      // Redirect or update the UI as needed
    } catch (error) {
      console.log(error);
      // Dispatch a failure action
      dispatch(loginFailure());
    }
  };
};

export const loginSuccess = (token) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: token,
  };
};

export const loginFailure = () => {
  return {
    type: "LOGIN_FAILURE",
  };
};
