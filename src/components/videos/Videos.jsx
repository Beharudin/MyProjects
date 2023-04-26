import React, { useEffect, useState } from "react";
import "./videos.css";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";
import { Link } from "react-router-dom";

function Videos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        await axios.get("/videos").then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  return (
    <div className="text-center mt-5 pb-5" id="videos">
      {loading ? (
        <Loader />
      ) : data.length ? (
        <>
          <div className="container">
            <div className="col-12 col-md-offset-1 mb-3">
              <h2>Videos</h2>
            </div>
            <div className="row">
              {data
                ? data.map((data, index) => (
                    <div
                      key={index}
                      className="col-xs-12 col-md-6 col-lg-4"
                    >
                      <div className="card mb-3">
                        <div className="videos-desc m-2">
                          <h3>{data.topic}</h3>
                          <p className="videos-text">{data.body}</p>
                          <Link className="btn btn-primary" to={data.link}>
                            Watch
                          </Link>
                        </div>
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

export default Videos;
