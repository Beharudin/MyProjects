import React from "react";
import Topbar from "../topbar/Topbar";
import Carousel from "./Carousel";
import Posts from "../posts/Posts";
import About from "../about/About";
import Contact from "../footer/Contact";
import Testimonials from "../testimonials/Testimonials";
import Asoosama from "../asoosama/Asoosama";
import Videos from "../videos/Videos";
import Walaloo from "../walaloo/Walaloo";

function Homepage() {
  return (
    <div>
    <Topbar />
    <Carousel />
      <Asoosama />
      <Walaloo />
      <Videos />
      <Posts />
      <About />
      <Testimonials/>
      <Contact /> 
    </div>
  );
}

export default Homepage;
