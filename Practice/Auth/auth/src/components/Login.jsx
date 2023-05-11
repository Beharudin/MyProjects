import React, { useState } from "react";
import { UseAuth } from "./Auth";

function Login() {
  const [username, setUsername] = useState("");
  const auth = UseAuth();

  const handleLogin = () => {
    alert("user auth", username);
    auth.login("username");
    window.location.href = "/home";
  };

  return (
    <div>
      <h1>Login Page</h1>
      name: <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <br />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
