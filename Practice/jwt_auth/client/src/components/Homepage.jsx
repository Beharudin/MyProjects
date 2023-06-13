import React from "react";
import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/logoutActions";


function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.loginAuth.accessToken);
  const decodedToken = jwtDecode(token);


  const logoutHandler = async (email, pwd) => {
    dispatch(logout("/login", navigate));
  };

  return (
    <div>
      <h3>Welcome, {decodedToken.username}</h3>
      <h4>Home page </h4>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Homepage;
