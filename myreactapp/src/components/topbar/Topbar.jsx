import React from 'react'
import './topbar.css'
import {Search, Person, Chat, Notifications} from '@mui/icons-material';

function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
          <span className="logo">Myreactapp</span>
      </div>
      <div className="topbarCenter">
         <div className="searchbar">
            <Search className="sarchIcon"/>
            <input placeholder='Search...' className="searchInput" />
         </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <div className="topbarLink"></div>
            <div className="topbarLink"></div>
        </div>
        <div className="topbaricons">
          <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  )
}

export default Topbar
