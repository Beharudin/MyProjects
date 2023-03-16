import axios from 'axios'
import {fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure} from'./userTypes'

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

  export const getUsers = () => {
    return (dispatch)=>{
      dispatch(UsersRequest());
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const users = response.data.map((user) => user.name);
          // console.log("users"+users);
          dispatch(UsersSuccess(users));
          
        })
        .catch((err) => {
          dispatch(UsersFailure(err.message));
        });
    };
  };