import React from "react";
import data from "../../data/data.json";
import "./posts.css";
import Topbar from "../topbar/Topbar";

function ReadPost() {
  return (
    <div>
      <Topbar />
      <div className="text-center mt-5 mb-5">
        {data.Posts ? (
          <div className="container">
            <div className="col-12 col-md-offset-1 card">
              <div>
                <h2>Post Heloo</h2>
              </div>
              <div className="text-start">
                <p>
                  These are long-term post that are used to finance the purchase
                  of a home. The home serves as collateral for the loan.
                </p>
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export default ReadPost;
