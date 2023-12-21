import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../admin/components/Loader";
import About from "../about/About";
import Notifications from "../common/Notifications";
import Contact from "../footer/Footer";
import Novels from "../novels/Novels";
import Poems from "../poems/Poems";
import Posts from "../posts/Posts";
import Testimonials from "../testimonials/Testimonials";
import Topbar from "../topbar/Topbar";
import Videos from "../videos/Videos";
import Carousel from "./Carousel";

function Homepage({ isLaoding }) {
  const [loading, setLoading] = useState(true);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    if (!isLaoding) setLoading(false);
  }, [isLaoding]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : !notification ? (
        <>
          <Topbar />
          <Carousel />
          <Novels />
          <Poems />
          <Posts />
          <Videos />
          <About />
          <Testimonials />
          <Contact />
        </>
      ) : (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      )}
    </div>
  );
}

export default Homepage;
