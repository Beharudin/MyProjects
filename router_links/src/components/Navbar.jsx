import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import './index.css'

function Navbar() {
  const auth=useAuth()
  const navigate = useNavigate()
  const logoutHandler=()=>{
    auth.logout()
    navigate('/login')
  }
  return (
    // <nav>
    //    <Link to='/'>Home</Link>
    //    <Link to='/about'>About</Link> 
    // </nav>
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <Link class="navbar-brand active" to="/">Myapp</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            {/* <Link class="nav-link" to="/">Home</Link> */}
                <NavLink class="nav-link" to="/">Home</NavLink>
            </li>
            <li class="nav-item">
            {/* <Link class="nav-link" to="/about">About</Link> */}
                <NavLink class="nav-link" to="/about">About</NavLink>
            </li>
            <li class="nav-item">
                <NavLink class="nav-link" to="/products">Products</NavLink>
            </li>
            <li class="nav-item">
               <NavLink class="nav-link" to="/profile">Profile</NavLink>
            </li>
            {
              !auth.user&&(
                <li class="nav-item">
                  <NavLink class="nav-link" to="/login">Login</NavLink>
              </li>
              )}{
              auth.user&&(
                <li class="nav-item">
                  <NavLink class="nav-link" onClick={logoutHandler}>Logout</NavLink>
              </li>
              )
            }
        </ul>
        </div>
    </div>
</nav>
  )
}

export default Navbar
