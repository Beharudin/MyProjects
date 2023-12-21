import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../admin/components/Loader";
import { fetchAboutData } from "../../store/about/aboutActions";
import { fetchNovelData } from "../../store/novel/novelActions";
import { fetchPoemData } from "../../store/poem/poemActions";
import { fetchPostData } from "../../store/post/postActions";
import { fetchTestimonialData } from "../../store/testimonial/testimonialActions";
import { fetchVideoData } from "../../store/video/videoActions";
import { fetchWebInfoData } from "../../store/website/webActions";
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

function Homepage() {
  const [loading, setLoading] = useState(true);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
      try {
        setLoading(true);
        // await axios.get("https://mocki.io/v1/cca834f9-58d3-4b1e-aa62-fe9c8eab02d0").then((res) => {
        //   setAboutData(res.data);
        // });
        // await axios.get("https://mocki.io/v1/9f269926-5f26-4f78-a3da-45f4b1db6ae2").then((res) => {
        //   setNovelsData(res.data.data);
        // });
        // await axios.get("https://mocki.io/v1/c9b68d6c-220e-4f61-b305-3212cfb7e6af").then((res) => {
        //   setPoemsData(res.data.data);
        // });
        // await axios.get("https://mocki.io/v1/1044df4d-d5db-44b6-8f93-dad43474d6a6").then((res) => {
        //   setPostsData(res.data.data);
        // });
        // await axios.get("https://mocki.io/v1/1cb216e5-83e4-410f-9751-e88893244627").then((res) => {
        //   setWebsiteData(res.data.data);
        // });
        // await axios
        //   .get("https://mocki.io/v1/eb6f9db4-1479-459a-98d7-61183e4d4add")
        //   .then((res) => {
        //     setTestimonialsData(res.data.data);
        //   });
        // await axios.get("https://mocki.io/v1/59683a1a-2db0-4c31-8994-80725358fac9").then((res) => {
        //   setVideosData(res.data.data);
        // });
        dispatch(fetchNovelData());
        dispatch(fetchPoemData());
        dispatch(fetchPostData());
        dispatch(fetchVideoData());
        dispatch(fetchAboutData());
        dispatch(fetchTestimonialData());
        dispatch(fetchWebInfoData());
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
  }, []);

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
