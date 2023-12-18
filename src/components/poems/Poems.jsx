import React from "react";
import "./poem.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Poems() {
  const data=useSelector(state=>state.novel.novelsList);

  return (
    <div className="text-center pb-2" id="poems">
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
                      <Link className="btn btn-primary" to={`/poem/${data.id}`}>
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

export default Poems;
