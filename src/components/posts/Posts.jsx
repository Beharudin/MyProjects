import React from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Posts() {
  const data=useSelector(state=>state.post.postsList);

  return (
    <div className="text-center mt-5 pb-2" id="posts">
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-3">
          <h2>Posts</h2>
        </div>
        <div className="row">
          {data
            ? data.map((data, index) => (
                <div key={index} className="col-xs-12 col-md-6 col-lg-4">
                  <div className="card mb-3">
                    <div className="posts-desc m-2">
                      <h3>{data.topic}</h3>
                      <p className="posts-text">{data.body}</p>
                      <Link className="btn btn-primary" to={`/post/${data.id}`}>
                        Read More
                      </Link>
                    </div>
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
