import React from 'react'
import Rightbar from '../../components/rightbar/Rightbar';
import './home.css'


function Home() {
  return (
    <div style={{width: "70%"}}> 
       <div className="homeContainer">
        <Rightbar />
      </div>
    </div>
  )
}

export default Home
