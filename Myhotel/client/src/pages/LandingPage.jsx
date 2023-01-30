import React from 'react'
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className='row align-items-center justify-content-center landing'>
      <div className="col-md-9 text-center justify-content-center">
        <h2 style={{fontSize: '130px'}}>Myhotel</h2>
        <h5>There is only one boss. The Guest.</h5>
        <Link to='/home'>
            <button className='btn mybtn'>Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
