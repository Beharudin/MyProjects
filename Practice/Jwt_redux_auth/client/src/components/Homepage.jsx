import React from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

function Homepage() {
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);

  return (
    <div>
      <h3>Welcome, {decodedToken.result.username}</h3>
      <h4>Home page </h4>
    </div>
  );
}

export default Homepage;
