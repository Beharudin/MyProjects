import React from "react";
import "./novel.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Novels() {
  const novelsData=useSelector(state=>state.novel.novelsList)

  return (
    <div className="text-center pb-2" id="novels">
      <div className="container">
        <div className="col-12 mb-3 mt-5">
          <h2>Asoosama</h2>
        </div>
        <div className="row">
          {novelsData
            ? novelsData.map((data, index) => (
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
    </div>
  );
}

export default Novels;
