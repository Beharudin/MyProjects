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
        await axios.get("http://192.168.77.225:3001/api/about").then((res) => {
          setAboutData(res.data.data[0]);
        });
        await axios.get("http://192.168.77.225:3001/api/novels").then((res) => {
          setNovelsData(res.data.data);
        });
        await axios.get("http://192.168.77.225:3001/api/poems").then((res) => {
          setPoemsData(res.data.data);
        });
        await axios.get("http://192.168.77.225:3001/api/posts").then((res) => {
          setPostsData(res.data.data);
        });
        await axios.get("http://192.168.77.225:3001/api/website").then((res) => {
          setWebsiteData(res.data.data);
        });
        await axios
          .get("http://192.168.77.225:3001/api/testimonials/random")
          .then((res) => {
            setTestimonialsData(res.data.data);
          });
        await axios.get("http://192.168.77.225:3001/api/videos").then((res) => {
          setVideosData(res.data.data);
        });
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
          <Novels data={novelsData} />
          <Poems data={poemsData} />
          <Posts data={postsData} />
          <Videos data={videosData} />
          <About data={aboutData} />
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
