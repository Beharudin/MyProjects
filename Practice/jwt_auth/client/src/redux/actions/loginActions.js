import axios from "axios";

export const login = (email, password, redirectPath, navigate) => {

  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password }
      );
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      // Dispatch a success action with the received token
      dispatch(loginSuccess(accessToken, refreshToken));
      navigate(redirectPath, { replace: true });

      // Redirect or update the UI as needed
    } catch (error) {
      console.log(error);
      // Dispatch a failure action
      dispatch(loginFailure());
    }
  };
};

export const loginSuccess = (accessToken, refreshToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {accessToken, refreshToken},
  };
};

export const loginFailure = () => {
  return {
    type: "LOGIN_FAILURE",
  };
};

