import React from "react";
import "./about.css";

function About() {
  const data=null;
  
  return (
    <div id="about">
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img
              src={"http://localhost:3001/images/mohammed.jpeg"}
              // src={"http://localhost:3001/images/" + data.img}
              className="img-responsive mr-2"
              alt=""
            />
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="about-text">
              <h2 className="text-center">About Us</h2>
              <p>{data ? data.description : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;