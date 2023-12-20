import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Homepage from "./components/body/Homepage";
import PageNotFound from "./components/notfound/PageNotFound";
import ReadNovel from "./components/novels/ReadNovel";
import ReadPoem from "./components/poems/ReadPoem";
import ReadPost from "./components/posts/ReadPosts";
import Dashboard from "./admin/scenes/dashboard/Dashboard";
import Login from "./admin/components/Login";
import Novels from "./admin/scenes/novels/Novels";
import Testimonials from "./admin/scenes/testimonials/Testimonials";
import Website from "./admin/scenes/website/Website";
import Poems from "./admin/scenes/poems/Poems";
import { useState } from "react";
import { mytheme } from "./theme";
import About from "./admin/scenes/about/About";
import Posts from "./admin/scenes/posts/Posts";
import Videos from "./admin/scenes/videos/Videos";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import AddSidebarAndTopbar from "./components/common/AddSidebarAndTopbar";
import { fetchNovelData } from "./store/novel/novelActions";
import { fetchPoemData } from "./store/poem/poemActions";
import { fetchPostData } from "./store/post/postActions";
import { fetchVideoData } from "./store/video/videoActions";
import { fetchAboutData } from "./store/about/aboutActions";
import { fetchTestimonialData } from "./store/testimonial/testimonialActions";
import { fetchWebInfoData } from "./store/website/webActions";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

let firstTimeRender = true;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNovelData());
    dispatch(fetchPoemData());
    dispatch(fetchPostData());
    dispatch(fetchVideoData());
    dispatch(fetchAboutData());
    dispatch(fetchTestimonialData());
    dispatch(fetchWebInfoData());
  }, []);

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/novel/:id" exact element={<ReadNovel />} />
            <Route path="/poem/:id" exact element={<ReadPoem />} />
            <Route path="/post/:id" exact element={<ReadPost />} />

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
