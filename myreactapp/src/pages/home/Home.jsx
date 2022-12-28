import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css'

function Home() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
      </div>
    </div>
  )
}

export default Home
