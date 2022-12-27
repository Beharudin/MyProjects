import React from "react";
import "./Single.scss";
import Topbar from "../../components/topbar/Topbar";
import SingleService from "../../components/singleService/singleService";
import Footer from "./../../components/footer/Footer";

function Single() {
  return (
    <div className="single">
      <Topbar />
      <SingleService />
      <Footer />
    </div>
  );
}

export default Single;
