import React, { useEffect, useState } from "react";
import "./novel.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";

function Novels() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovels = async () => {
      try {
        setLoading(true);
        await axios.get("/novels").then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getNovels();
  }, []);

  return (
    <div className="text-center pb-5" id="novels">
      {loading ? (
        <Loader />
      ) : data.length ? (
        <>
          <div className="container">
            <div className="col-12 mb-3 mt-5">
              <h2>Asoosama</h2>
            </div>
            <div className="row">
              {data
                ? data.map((data, index) => (
                    <div key={index} className="col-xs-12 col-md-6 col-lg-4">
                      <div className="card mb-3">
                        <div className="novels-desc m-2">
                          <h3>
                            {data.topic} {data.section}
                          </h3>
                          <p className="novels-text">{data.body}</p>
                          <Link
                            className="btn btn-primary"
                            to={`/novel/${data.id}`}
                          >
                            Read More
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

export default Novels;
