import React from "react";
import Topbar from "../topbar/Topbar";
import Carousel from "./Carousel";
import Posts from "../posts/Posts";
import About from "../about/About";
import Contact from "../footer/Footer";
import Testimonials from "../testimonials/Testimonials";
import Novels from "../novels/Novels";
import Videos from "../videos/Videos";
import Poems from "../poems/Poems";

function Homepage() {
  return (
    <div>
    <Topbar />
    <Carousel />
      <Novels />
      <Poems />
      <Posts />
      <Videos />
      <About />
      <Testimonials/>
      <Contact /> 
    </div>
  );
}

export default Homepage;
