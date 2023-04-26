import React, { useEffect, useState } from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";

function Posts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        await axios.get("/posts").then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="text-center mt-5 pb-5" id="posts">
      {loading ? (
        <Loader />
      ) : data.length ? (
        <>
      <div className="container">
        <div className="col-12 col-md-offset-1 mb-3">
          <h2>Posts</h2>
        </div>
        <div className="row">
          {data
            ? data.map((data, index) => (
                <div key={index} className="card col-xs-12 col-md-6 col-lg-4 mb-2">
                  <div className="posts-desc m-2">
                    <h3>{data.topic}</h3>
                    <p className="posts-text">{data.body}</p>
                    <Link className="btn btn-primary" to={`/post/${data.id}`}>Read More</Link>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
      </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default Posts;
