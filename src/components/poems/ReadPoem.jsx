import React, { useEffect, useState } from "react";
import "./poem.css";
import Topbar from "../topbar/Topbar";
import axios from "axios";
import Loader from "../../admin/components/Loader";
import { useParams } from "react-router-dom";
import Notifications from "../common/Notifications";
import { useSelector } from "react-redux";

function ReadPoem() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const getPoem = async () => {
      try {
        setLoading(true);
        await axios.get(`https://mocki.io/v1/47258d39-f46f-4471-966a-3d761653e692`).then((res) => {
        // await axios.get(`http://localhost:3001/api/poems/${id}`).then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getPoem();
  }, [id]);

  return (
    <div style={{ marginTop: "80px" }}>
      <Topbar />
      {loading ? (
        <Loader />
      ) : data ? (
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
        "Loading..."
      )}
    </div>
  );
}

export default ReadPoem;
