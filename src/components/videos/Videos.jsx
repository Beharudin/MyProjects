import React from "react";
import "./videos.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Videos() {
  const data=useSelector(state=>state.video.videosList);

  return (
    <div className="text-center mt-5" id="videos">
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-3">
          <h2>Videos</h2>
        </div>
        <div className="row">
          {data
            ? data.map((data, index) => (
                <div key={index} className="col-xs-12 col-md-6 col-lg-4">
                  <div className="card mb-3">
                    <div className="videos-desc m-2">
                      <h3>{data.topic}</h3>
                      <p className="text-left">{data.body}</p>
                      <Link className="btn btn-primary" to={data.link}>
                        Watch
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : "Something went wrong, please try again later!"}
        </div>
      </div>
    </div>
  );
}

export default Videos;
