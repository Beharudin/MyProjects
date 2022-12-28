import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'

function Profile() {
    const auth=useAuth()
    const navigate=useNavigate()

    const logoutHandler=()=>{
        auth.logout()
        navigate('/login')
    }

  return (
    <div>
      <h2>Welcome {auth.user}</h2>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Profile
