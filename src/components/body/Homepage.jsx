import React, { useEffect, useState } from "react";
import Topbar from "../topbar/Topbar";
import Carousel from "./Carousel";
import Posts from "../posts/Posts";
import About from "../about/About";
import Contact from "../footer/Footer";
import Testimonials from "../testimonials/Testimonials";
import Novels from "../novels/Novels";
import Videos from "../videos/Videos";
import Poems from "../poems/Poems";
import axios from "axios";
import Error from "../../admin/components/Error";
import Loader from "../../admin/components/Loader";

function Homepage() {
  const [aboutData, setAboutData] = useState([]);
  const [novelsData, setNovelsData] = useState([]);
  const [poemsData, setPoemsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [websiteData, setWebsiteData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const getData = async () => {
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
        await axios.get("https://mocki.io/v1/1cb216e5-83e4-410f-9751-e88893244627").then((res) => {
          setWebsiteData(res.data.data);
        });
        await axios
          .get("https://mocki.io/v1/eb6f9db4-1479-459a-98d7-61183e4d4add")
          .then((res) => {
            setTestimonialsData(res.data.data);
          });
        // await axios.get("https://mocki.io/v1/59683a1a-2db0-4c31-8994-80725358fac9").then((res) => {
        //   setVideosData(res.data.data);
        // });
        // await axios.get("http://192.168.77.225:3001/api/about").then((res) => {
        //   setAboutData(res.data.data[0]);
        // });
        // await axios.get("http://192.168.77.225:3001/api/novels").then((res) => {
        //   setNovelsData(res.data.data);
        // });
        // await axios.get("http://192.168.77.225:3001/api/poems").then((res) => {
        //   setPoemsData(res.data.data);
        // });
        // await axios.get("http://192.168.77.225:3001/api/posts").then((res) => {
        //   setPostsData(res.data.data);
        // });
        // await axios.get("http://192.168.77.225:3001/api/website").then((res) => {
        //   setWebsiteData(res.data.data);
        // });
        // await axios
        //   .get("http://192.168.77.225:3001/api/testimonials/random")
        //   .then((res) => {
        //     setTestimonialsData(res.data.data);
        //   });
        // await axios.get("http://192.168.77.225:3001/api/videos").then((res) => {
        //   setVideosData(res.data.data);
        // });
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : !error ? (
        <>
          <Topbar />
          <Carousel />
          <Novels />
          <Poems />
          <Posts />
          <Videos />
          <About />
          <Testimonials data={testimonialsData} />
          <Contact data={websiteData} />
        </>
      ) : (
        <Error message="Something went wrong, please try again later!" />
      )}
    </div>
  );
}

export default Homepage;
