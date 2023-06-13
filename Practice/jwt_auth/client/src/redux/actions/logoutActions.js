import axios from "axios";

export const logout = (redirectPath, navigate) => {

  return async (dispatch) => {
    try {
      dispatch(logoutRequest());
      navigate(redirectPath, { replace: true });

      // Redirect or update the UI as needed
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutRequest = () => {
  return {
    type: "LOGOUT_REQUEST",
  };
};
