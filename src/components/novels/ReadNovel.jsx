import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Notifications from "../common/Notifications";
import Topbar from "../topbar/Topbar";

function ReadNovel() {
  const { id } = useParams();
  const notification = useSelector((state) => state.ui.notification);
  const data = useSelector(
    (state) => state.novel.novelsList.find((novel) => novel.id === parseInt(id))
  );

  return (
    <div style={{ marginTop: "80px" }}>
      <Topbar />
      { data ? (
        <>
          <div className="text-center mt-5 mb-5">
            {data && (
              <div className="container">
                <div className="col-12 col-md-offset-1 card">
                  <div>
                    <h2>
                      {data.topic} {data.section}
                    </h2>
                  </div>
                  <div className="text-start">
                    <p>{data.body}</p>
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

export default ReadNovel;
