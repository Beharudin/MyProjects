import React from 'react'
import './topbar.css'
import { NavLink } from 'react-router-dom';

function Topbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mynavbar">
        <div className="container-fluid">
            <NavLink className="navbar-brand active" to='/'>Myapp</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynavbar" aria-controls="mynavbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" to='/'>Features</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='/'>Enterprise</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='/'>Support</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to='/'>Pricing</NavLink>
                </li>
            </ul>
            </div>
            <div className="collapse navbar-collapse" id="mynavbar1">
              <ul className="nav navbar-nav navbar-right me-auto mb-2 mb-lg-0r" id='mynav'>
                  <li className="nav-item"><NavLink className="nav-link" to='/'>Sign Up</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to='/'>Login</NavLink></li>
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default Topbar
