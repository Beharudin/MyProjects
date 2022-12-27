import React from "react";
import "./Slider.scss";

const Slider = () => {
  return (
    <div className="slider">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 sliderImg"
              src="https:picsum.photos/800/200"
              alt="First slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Slider Title</h5>
              <p>Slider Description</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 sliderImg"
              src="https:picsum.photos/800/201"
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Slider Title</h5>
              <p>Slider Description</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 sliderImg"
              src="https:picsum.photos/800/202"
              alt="Third slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Slider Title</h5>
              <p>Slider Description</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Slider;
