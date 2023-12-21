import React from "react";
import { Box, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { MenuBook } from "@mui/icons-material";
import ServicesList from "../../components/ServicesList";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../../../components/common/Notifications";
import { fetchNovelData } from "../../../store/novel/novelActions";
import { fetchPoemData } from "../../../store/poem/poemActions";
import { fetchPostData } from "../../../store/post/postActions";
import { fetchVideoData } from "../../../store/video/videoActions";
import { fetchAboutData } from "../../../store/about/aboutActions";
import { fetchTestimonialData } from "../../../store/testimonial/testimonialActions";
import { fetchWebInfoData } from "../../../store/website/webActions";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  const novelsList = useSelector((state) => state.novel.novelsList);
  const poemsList = useSelector((state) => state.poem.poemsList);
  const postsList = useSelector((state) => state.post.postsList);
  const videosList = useSelector((state) => state.video.videosList);
  
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setLoading(true);
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
    <>
      {loading ? (
        <Loader />
      ) : !notification ? (
        <>
          <Box m="20px">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
            >
              {/* ROW 1 */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="12,361"
                  subtitle="Novels"
                  progress="0.14"
                  increase="+14%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="431,225"
                  subtitle="Poems"
                  progress="0.21"
                  increase="+21%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 4" },
                  boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
                }}
              >
                <StatBox
                  title="32,441"
                  subtitle="Posts"
                  progress="0.05"
                  increase="+5%"
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  marginLeft: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Our Services
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px"
                sx={{ marginBottom: "50px", marginTop: "10px" }}
              >
                <Box
                  height="50vh"
                  sx={{
                    gridColumn: { xs: "span 12", sm: "span 8" },
                    boxShadow: 2,
                  }}
                >
                  <LineChart />
                </Box>
                <Box
                  height="50vh"
                  sx={{
                    gridColumn: { xs: "span 12", sm: "span 4" },
                    boxShadow: 2,
                  }}
                >
                  <PieChart />
                </Box>
              </Box>
            </Box>
            <Box>
              <ServicesList title="novels" data={novelsList}/>
              <ServicesList title="poems" data={poemsList} />
              <ServicesList title="posts" data={postsList} />
              <ServicesList title="videos" data={videosList} />
            </Box>
          </Box>
        </>
      ) : notification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      ) : (
        "Something went wrong, please try again later!"
      )}
    </>
  );
};

export default Dashboard;
