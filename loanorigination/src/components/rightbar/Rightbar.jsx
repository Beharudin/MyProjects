import React from 'react'
import "./rightbar.css";

function Rightbar() { 
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="container px-1 px-md-4 mx-auto">
          <div className="rightbarCard bg-gray">
            <div className="row d-flex px-3 card-content">
              <h5 className='p-3 text-center'> Create New Application </h5>
              <button className='btn btn-primary'>Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar