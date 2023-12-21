import React from "react";
import { Box, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { MenuBook } from "@mui/icons-material";
import ServicesList from "../../components/ServicesList";
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
  const [error, setError] = useState(false);
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
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, []);

  const StatBoxContainer = ({ children }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        gridColumn: { xs: "span 12", sm: "span 3" },
        boxShadow: `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset`,
      }}
    >
      {children}
    </Box>
  );

  const findAverage = (number) => {
    const total =
      novelsList.length +
      poemsList.length +
      postsList.length +
      videosList.length;
    if (total !== 0) {
      const avg = number / total;
      return roundToTwo(avg);
    } else {
      return 0;
    }
  };

  const roundToTwo=(number)=>Math.round(number * 100) / 100;

  return (
    <>
      {loading ? (
        <Loader />
      ) : !error ? (
        <>
          <Box m="20px">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
            >
              {/* ROW 1 */}
              <StatBoxContainer>
                <StatBox
                  title={novelsList.length}
                  subtitle="Novels"
                  progress={findAverage(novelsList.length)}
                  increase={`${findAverage(novelsList.length*100)}%`}
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </StatBoxContainer>

              <StatBoxContainer>
                <StatBox
                  title={poemsList.length}
                  subtitle="Poems"
                  progress={findAverage(poemsList.length)}
                  increase={`${findAverage(poemsList.length * 100)}%`}
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </StatBoxContainer>

              <StatBoxContainer>
                <StatBox
                  title={postsList.length}
                  subtitle="Posts"
                  progress={findAverage(postsList.length)}
                  increase={`${findAverage(postsList.length * 100)}%`}
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </StatBoxContainer>
              <StatBoxContainer>
                <StatBox
                  title={videosList.length}
                  subtitle="Videos"
                  progress={findAverage(videosList.length)}
                  increase={`${findAverage(videosList.length * 100)}%`}
                  icon={<MenuBook sx={{ fontSize: "26px" }} />}
                />
              </StatBoxContainer>
            </Box>

            <Box>
              <ServicesList title="novels" data={novelsList} />
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
