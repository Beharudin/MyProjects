import React from 'react'
import Topbar from '../topbar/Topbar';
import Sidebar from "../sidebar/Sidebar";
import './home.css'
import Body from '../body/Body';

function Home() {
  return (
    <div className='homeContainer'> 
         <Sidebar />
    </div>
  )
}

export default Home
