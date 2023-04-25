import React from "react";
import data from "../../data/data.json";
import "./posts.css";
import { Link } from "react-router-dom";

function Posts() {
  return (
    <div className="text-center mt-5 pb-5" id="posts">
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-3">
          <h2>Posts</h2>
        </div>
        <div className="row">
          {data.Posts
            ? data.Posts.map((data, index) => (
                <div key={index} className="card col-xs-12 col-md-6 col-lg-4 mb-2">
                  <div className="posts-desc m-2">
                    <h3>{data.name} {data.section}</h3>
                    <p className="posts-text">{data.text}</p>
                    <Link className="btn btn-primary" to="/posts">Read More</Link>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Posts;
