import React from "react";
import { useSelector } from "react-redux";

function Testimonials() {
  const data=useSelector(state=>state.testimonial.testimonialsList);

  return (
    <div id="testimonials" className="mb-5">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {data
            ? data.map((data) => (
                <div key={data.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="testimonial d-flex">
                    <div className="m-3">
                      <img
                        className="rounded-circle"
                        src={"http://localhost:3001/images/" + data.img}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <div className="m-3">
                      <p>"{data.comment}"</p>
                      <div className="testimonial-meta">
                        {" "}
                        <h5>- {data.name}</h5>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
