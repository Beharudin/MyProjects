import React, { useEffect, useState } from 'react'
import './about.css'
import axios from 'axios'
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";

function About() {
  const [data, setData]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAbout = async () => {
      try {
        setLoading(true);
        await axios.get("/about").then((res) => {
          setData(res.data.data[0]);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getAbout();
  }, []);

  return (
    <div id="about">
      {loading ? (
        <Loader />
      ) : data.description ? (
        <>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <img src="images/mohammed.jpg" className="img-responsive mr-2" alt="" />
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="about-text">
              <h2 className='text-center'>About Us</h2>
              <p>{data ? data.description : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
      </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  )
}

export default About
