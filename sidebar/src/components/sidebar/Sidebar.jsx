import React, { useLayoutEffect, useRef, useState } from 'react'
import './sidebar.css'
import {Error, Menu, Home, Login, People, Person, PersonAddAlt1, Settings, ShoppingCart, Close} from'@mui/icons-material'
import Topbar from '../topbar/Topbar';
import Body from '../body/Body';


function Sidebar() {
    const [isOpen, setIsOpen]=useState(false);

    const ref = useRef(null);
    const [width, setWidth]   = useState(window.innerWidth);
    useLayoutEffect(() => {
        {width<768?setIsOpen(false):setIsOpen(true)}
    }, []);

  return (
    <>
    <div className='sidebarContainer'>
    <div className='sidebar p-3 bg-dark text-white' style={{marginLeft: isOpen ? "0px" : "-300px"}}>
        <div className="sidebarHeader p-2">
            <img src="../assets/myphoto.png" alt="photo" className="sidebarHeaderImg mb-2" />
            <span className='sidebarHeaderName p-2'>Bahar Mm</span>
        </div>
        <hr className='m-4'/>
      <div className="sidebarListItems m-2">
        <div className="sidebarlistItem mb-2 active">
            <Home className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Dashboard</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <People className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Customers</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <ShoppingCart className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Products</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <Person className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Account</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <Settings className='sidebarListIcon m-2' />
            <span className='sidebarListSpan'>Settings</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <Login className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Login</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <PersonAddAlt1 className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Register</span>
        </div>
        <div className="sidebarlistItem mb-2">
            <Error className='sidebarListIcon m-2'/>
            <span className='sidebarListSpan'>Error</span>
        </div>
      </div>
    </div>
    
        <div style={{
            marginLeft: isOpen ? "-30px" : "40px",
            color: isOpen ? "white" : "black"
            }} className="bars">
            <Menu onClick={()=>setIsOpen(!isOpen)}/>
        </div>
        
        <div className="bodyContainer">
        <Topbar />
        <Body />
        </div>
    </div> 
    </>
  )
}

export default Sidebar
