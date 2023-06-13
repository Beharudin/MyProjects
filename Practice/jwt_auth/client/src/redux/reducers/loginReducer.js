const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
