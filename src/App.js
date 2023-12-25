import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./admin/components/Login";
import About from "./admin/scenes/about/About";
import Dashboard from "./admin/scenes/dashboard/Dashboard";
import Novels from "./admin/scenes/novels/Novels";
import Poems from "./admin/scenes/poems/Poems";
import Posts from "./admin/scenes/posts/Posts";
import Testimonials from "./admin/scenes/testimonials/Testimonials";
import Videos from "./admin/scenes/videos/Videos";
import Website from "./admin/scenes/website/Website";
import Homepage from "./components/body/Homepage";
import AddSidebarAndTopbar from "./components/common/AddSidebarAndTopbar";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import PageNotFound from "./components/notfound/PageNotFound";
import ReadNovel from "./components/novels/ReadNovel";
import ReadPoem from "./components/poems/ReadPoem";
import ReadPost from "./components/posts/ReadPosts";
import { fetchAboutData } from "./store/about/aboutActions";
import { fetchNovelData } from "./store/novel/novelActions";
import { fetchPoemData } from "./store/poem/poemActions";
import { fetchPostData } from "./store/post/postActions";
import { fetchTestimonialData } from "./store/testimonial/testimonialActions";
import { fetchVideoData } from "./store/video/videoActions";
import { fetchWebInfoData } from "./store/website/webActions";
import { mytheme } from "./theme";



function App() {
  const [loading, setLoading] = useState(true);
  const notification = useSelector((state) => state.ui.notification);
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
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/" exact element={<Homepage isLaoding={loading}/>} />
            <Route path="/novel/:id" exact element={<ReadNovel />} />
            <Route path="/poem/:id" exact element={<ReadPoem />} />
            <Route path="/post/:id" exact element={<ReadPost />} />
            <Route path="/hello" element={<Dashboard />} />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AddSidebarAndTopbar>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/website" element={<Website />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/novels" element={<Novels />} />
                      <Route path="/posts" element={<Posts />} />
                      <Route path="/poems" element={<Poems />} />
                      <Route path="/videos" element={<Videos />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                    </Routes>
                  </AddSidebarAndTopbar>
                </ProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<Login />} />
           
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
