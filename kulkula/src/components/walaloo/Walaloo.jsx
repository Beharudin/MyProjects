import React from "react";
import data from "../../data/data.json";
import "./walaloo.css";

function Walaloo() {
  return (
    <div className="text-center mt-5 mb-5" id="posts">
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-5">
          <h2>Walaloo</h2>
        </div>
        <div className="row">
          {data.Posts
            ? data.Posts.map((data, index) => (
                <div key={index} className="col col-xs-12 col-md-6 col-lg-4 mb-5">
                  <div className="posts-desc m-2">
                    <h3>{data.name}, {data.section}</h3>
                    <p className="posts-text">{data.text}</p>
                    <button
                      className="btn btn-primary"
                    //   onClick={() => DisplayModal(data.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Walaloo;
