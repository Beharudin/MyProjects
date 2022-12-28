import React from 'react'
import './topbar.css'
import {Notifications} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
          <NavLink className="nav-link" to="/"><img src="/assets/coop2.png" alt="img" className="topbarImg" /></NavLink>
          <ul class="nav navbar-nav me-auto mb-2 mb-lg-0 text-white">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">LoanOrigination</NavLink>
          </li>
          </ul>
      </div>
       
      <div className="topbarRight">
        <div className="topbaricons">
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
      </div> 
    </div> 
  )
}

export default Topbar
