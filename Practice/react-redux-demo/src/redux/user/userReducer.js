import {fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure} from'./userTypes'

const initialState = {
    loading: false,
    users: [],
    error: "",
  };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case fetchUsersRequest:
        return {
          ...state,
          loading: true,
        };
      case fetchUsersSuccess:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case fetchUsersFailure:
        return {
          loading: false,
          users: [],
          error: action.payload,
        };
        default:
        return state;
    }
  };

  export default userReducer;