import React from 'react'
import { UseAuth } from './Auth'

function Homepage() {
  const auth=UseAuth();

  // alert('user: ', auth.user)
  if(!auth.user){
    window.location.href='/login'
  }
  const handleLogout = () => {
    auth.logout();
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Welcome, {auth.user}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Homepage
