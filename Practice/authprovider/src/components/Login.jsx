import React, { useState } from "react";
import { UseAuth } from "./Auth";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const auth = UseAuth();
  const navigate = useNavigate();
  const location=useLocation();

  const redirectPath=location.state ? location.state.path : '/';

  const handleLogin = () => {
    auth.login(user);
    navigate(redirectPath, { replace: true });
  };

  return (
    <div>
      <h1>Login page</h1>
      <input
        type="text"
        name="name"
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
