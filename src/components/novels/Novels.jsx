import React from "react";
import data from "../../data/data.json";
import "./novel.css";
import { Link } from "react-router-dom";

function Novels() {
  return (
    <div className="text-center pb-5" id="novels">
      <div className="container">
        <div className="col-12 mb-3 mt-5">
          <h2>Asoosama</h2>
        </div>
         <div className="row">
          {data.Asoosama
            ? data.Asoosama.map((data, index) => (
                <div key={index} className="card col-xs-12 col-md-6 col-lg-4">
                  <div className="novels-desc m-2">
                    <h3>{data.name}</h3>
                    <p className="novels-text">{data.text}</p>
                    <Link
                      className="btn btn-primary"
                      to="/novel"
                    >
                      Read More
                    </Link>
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
