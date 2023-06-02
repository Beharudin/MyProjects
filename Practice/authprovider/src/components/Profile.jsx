import React from "react";
import { UseAuth } from "./Auth";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const auth=UseAuth();
    const navigate=useNavigate();
    
    console.log("auth: ", auth)

    const handleLogout =()=>{
        auth.logout()
        navigate('/')
    }

  return (
    <div>
      <h1>Profile page</h1>
      <h5>Welcome, {auth.user}</h5>
      <Link to="/"><button>home</button></Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
