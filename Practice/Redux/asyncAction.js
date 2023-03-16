const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsersRequest = "fetchUsersRequest";
const fetchUsersSuccess = "fetchUsersSuccess";
const fetchUsersFailure = "fetchUsersFailure";

const UsersRequest = () => {
  return {
    type: fetchUsersRequest,
  };
};

const UsersSuccess = (users) => {
  return {
    type: fetchUsersSuccess,
    payload: users,
  };
};

const UsersFailure = (error) => {
  return {
    type: fetchUsersFailure,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
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

const getUsers = () => {
  return function (dispatch) {
    dispatch(UsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(UsersSuccess(users));
      })
      .catch((err) => {
        dispatch(UsersFailure(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(getUsers());
