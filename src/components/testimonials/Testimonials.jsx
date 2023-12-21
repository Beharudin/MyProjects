import React from "react";
import "./testimonials.css";
import { useSelector } from "react-redux";

function Testimonials() {
  const data = useSelector((state) => state.testimonial.testimonialsList);

  return (
    <div className="container mb-5" id="testimonials">
      <div className="section-title text-center">
        <h2>What our clients say</h2>
      </div>
      <div className="row">
        {data
          ? data.map((data) => (
              <div key={data.id} className="col col-lg-4 col-md-6 col-12">
                <div className="d-flex">
                  <div className="mx-2">
                    <img
                      className="rounded-circle my-4"
                      src={
                        `${process.env.REACT_APP_BACKEND_BASE_URL}/images/` +
                        data.img
                      }
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="mx-2">
                    <p>"{data.comment}"</p>
                    <div>
                      {" "}
                      <h5>- {data.name}</h5>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "Something went wrong, please try again later!"}
      </div>
    </div>
  );
}

export default Testimonials;
