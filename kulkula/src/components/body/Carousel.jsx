import React from "react";

function Carousel() {
  return (
    <div id="top" className="fluid-container" style={{ marginTop: "50px" }}>
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
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="../../images/riqicha.jpg"
              alt="First slide"
              height="600px"
            />
            <div class="carousel-caption d-none d-md-block">
            <h5>Riqicha Bultii Islaamaa</h5>
            <p>Kitaaba Riqicha Bultii Islaamaa jedhamu kan yeroo ammaa raabsamaa jiruu fi dubbistoota baayyeen jaalatamummaa kan argate.</p>
          </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="../../images/kulkula.jpg"
              alt="Second slide"
              height="600px"
            />
            <div class="carousel-caption d-none d-md-block">
            <h5>Kulkula Dhugaa Dhikkifate</h5>
            <p>Kitaaba Kulkula Dhugaa Dhikkifate jedhamu kan asiin dura harka dubbistootaa gahee fi jaalatamummaa guddaa kan argate.</p>
          </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="../../images/mohammed.jpg"
              alt="Third slide"
              height="600px"
            />
            <div class="carousel-caption d-none d-md-block">
            <h5>Mohammed Bakar Saido</h5>
            <p>Barsiisaa fi barreessaa kitaabotaa fi asoosama adda addaa.</p>
          </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Carousel;
