import React from "react";
import data from "../../data/data.json";
import "./videos.css";

function Videos() {
  return (
    <div className="text-center mt-5 pb-5" id="videos">
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-3">
          <h2>Videos</h2>
        </div>
        <div className="row">
          {data.Videos
            ? data.Videos.map((data, index) => (
                <div key={index} className="card col-xs-12 col-md-6 col-lg-4 mb-2">
                  <div className="posts-desc m-2">
                    <h3>{data.name}</h3>
                    <p className="posts-text">{data.text}</p>
                    <a
                      className="btn btn-primary"
                    href="https://www.youtube.com"
                    >
                      Watch
                    </a>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Videos;
