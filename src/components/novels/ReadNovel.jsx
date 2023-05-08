import React, { useEffect, useState } from "react";
import Topbar from "../topbar/Topbar";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";
import { useParams } from "react-router-dom";

function ReadNovel() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getNovel = async () => {
      try {
        setLoading(true);
        await axios.get(`https://mocki.io/v1/7e2d5dab-a144-4cb2-b51f-8c0e339159af`).then((res) => {
        // await axios.get(`http://localhost:3001/api/novels/${id}`).then((res) => {
          setData(res.data.data);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getNovel();
  }, [id]);

  return (
    <div style={{marginTop: '80px'}}>
      <Topbar />
      {loading ? (
        <Loader />
      ) : data ? (
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
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default ReadNovel;
