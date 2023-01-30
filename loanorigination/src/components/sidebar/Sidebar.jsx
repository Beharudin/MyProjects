import React, { useState, useLayoutEffect, useRef } from 'react'
import './sidebar.css'
import {OpenInNew,
  Timeline,
  Settings,
  Person2,
  Language,
  Key,
  Logout,Menu, Close} from '@mui/icons-material'
  import {NavLink} from 'react-router-dom'

function Sidebar() {
  const[isOpen ,setIsOpen] = useState(true);
  const toggle = () => setIsOpen (!isOpen);

  const ref = useRef(null);
  const [width, setWidth]   = useState(window.innerWidth);
  useLayoutEffect(() => {
    {width<768?setIsOpen(false):setIsOpen(true)}
  }, []);

  return (
    <div>
      <div style={{marginLeft: isOpen ? "260px" : "0px"}} className="bars">
        {isOpen?<Close onClick={toggle}/>:<Menu onClick={toggle}/>}
    </div>
      <div style={{marginLeft: isOpen ? "0px" : "-300px"}} className='sidebar'>
        <div className="sidebarWrapper">
          <ul className='sidebarlist'>
            <li className="sidebarListItem nav-item">
              <OpenInNew className='sidebarIcon'/>
              <NavLink className="nav-link" to="/">New Application</NavLink>
            </li>
            <li className="sidebarListItem">
              <Timeline className='sidebarIcon'/>
              <NavLink className="nav-link" to="/status">Status</NavLink>
            </li>
            <li className="sidebarListItem">
              <Settings className='sidebarIcon'/>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#settingContent" aria-controls="settingContent" aria-expanded="false" aria-label="Toggle navigation">
              <NavLink className="nav-link" >Setting</NavLink>
              </button>
            </li>
            <div className="collapse navbar-collapse" id="settingContent">
            <ul className="nav navbar-nav">
            <li className="settingListItem">
              <Person2 className='sidebarIcon'/>
              <NavLink className="nav-link" to="/">Profile</NavLink>
            </li>
            <li className="settingListItem">
              <Language className='sidebarIcon'/>
              <NavLink className="nav-link" to="/">Language</NavLink>
            </li>
            <li className="settingListItem">
              <Key className='sidebarIcon'/>
              <NavLink className="nav-link" to="/">Change Password</NavLink>
            </li>
            </ul>
            </div>
            <li className="sidebarListItem mt-2">
              <Logout className='sidebarIcon'/>
              <NavLink className="nav-link" to="/">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  )
}

export default Sidebar
