import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'

function Login() {
  const [user, setUser] =useState('')
  const auth= useAuth()
  const navigate=useNavigate()

  const loginHandler=()=>{
    auth.login(user)
    navigate('/')
  }

  return (
    <div>
      <input type="text" placeholder='Username' onChange={(e)=>setUser(e.target.value)}/>
      <button onClick={loginHandler}>Login</button>
    </div>
  )
}

export default Login
