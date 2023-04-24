import React from 'react'
import data from "../../data/data.json";
import './testimonials.css'

function Testimonials() {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {data.Testimonials
            ? data.Testimonials.map((d) => (
                <div key={d.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="testimonial d-flex">
                    <div className="m-3">
                      <img
                      className="rounded-circle"
                        src="images/mohammed.jpg"
                        alt=""
                        style={{width: '100px', height: '100px'}}
                      />
                    </div>
                    <div className="m-3">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> <h5>- {d.name}</h5> </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
