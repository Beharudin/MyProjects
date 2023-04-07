import React from 'react'
import data from "../../data/data.json";
import './about.css'

function About() {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img src="images/mohammed.jpg" className="img-responsive mr-2" alt="" />
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{data ? data.About : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
