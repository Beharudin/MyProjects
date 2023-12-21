import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Notifications from "../common/Notifications";
import Topbar from "../topbar/Topbar";
import "./poem.css";

function ReadPoem() {
  const { id } = useParams();
  const notification = useSelector((state) => state.ui.notification);
  const data = useSelector(
    (state) => state.poem.poemsList.find((poem) => poem.id === parseInt(id))
  );
  return (
    <div style={{ marginTop: "80px" }}>
      <Topbar />
      {data ? (
        <>
          <div className="">
            {data && (
              <div className="container ">
                <div className="col-12 col-md-offset-1 card p-md-5 p-xs-2">
                  <div>
                    <h2>{data.topic}</h2>
                  </div>
                  <div className="text-start">
                    <div className="poem-div mb-4 mt-4">
                      {data.body.split("#").map((paragraph) => (
                        <>
                          {paragraph.split(",").map((line) => (
                            <p className="poem-text mb-0 " key={line}>
                              {line}
                            </p>
                          ))}
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : notification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      ) : (
        "Something went wrong, please try again later!"
      )}
    </div>
  );
}

export default ReadPoem;
