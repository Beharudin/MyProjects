import React from "react";
import "./Service.scss";
import Topbar from "../../components/topbar/Topbar";
import Services from "../../components/services/Services";
// import Slider from "../../components/slider/Slider";
import Footer from "./../../components/footer/Footer";

function Service() {
  return (
    <div className="service">
      <Topbar />
      {/* <Slider /> */}
      <Services />
      <Footer />
    </div>
  );
}

export default Service;
