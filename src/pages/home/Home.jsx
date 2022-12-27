import React from "react";
import "./Home.scss";
import Topbar from "../../components/topbar/Topbar";
import Slider from "../../components/slider/Slider";
import Services from "../../components/services/Services";
import Footer from "./../../components/footer/Footer";
import Advert from "../../components/Advert/Advert";

function Home() {
  <Topbar />;
  return (
    <div className="home">
      {/* top navigation */}
      <Topbar />
      <Slider />
      <Advert />
      <Services />
      <Footer />
    </div>
  );
}

export default Home;
