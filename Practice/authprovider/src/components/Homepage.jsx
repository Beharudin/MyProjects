import React from "react";
import { UseAuth } from "./Auth";
import { Link } from "react-router-dom";

function Homepage() {
  const auth = UseAuth();
  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div>
      <h1>Home page</h1>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      {!auth.user ? (
        <Link to="/login">
          <button>Login</button>
        </Link>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Homepage;
