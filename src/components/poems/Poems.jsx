import React, { useEffect, useState } from "react";
import "./poem.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";

function Poems() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovels = async () => {
      try {
        setLoading(true);
        await axios.get("http://localhost:3001/api/poems").then((res) => {
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
    <div className="text-center pb-5" id="poems">
      {loading ? (
        <Loader />
      ) : data.length ? (
        <>
          <div className="container">
            <div className="col-12 mb-3">
              <h2>Walaloo</h2>
            </div>
            <div className="row">
              {data
                ? data.map((data, index) => (
                    <div key={index} className="col-xs-12 col-md-6 col-lg-4">
                      <div className="card mb-3">
                        <div className="poem-desc m-2">
                          <h3>{data.topic}</h3>
                          <div className="poem-div mt-4 mb-4">
                            {data.body.split("#").map((paragraph) =>
                              paragraph.split(",").map((line) => (
                                <p className="poem-text m-0" key={line}>
                                  {line}
                                </p>
                              ))
                            )}
                          </div>
                          <Link
                            className="btn btn-primary"
                            to={`/poem/${data.id}`}
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

export default Poems;
