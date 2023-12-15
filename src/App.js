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
import { fetchNovelData, updateNovelData } from "./store/novelActions";

let firstTimeRender = true;

function App() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isTopbar, setIsTopbar] = useState(false);
  const location = useLocation().pathname;
  const token = useSelector((state) => state.auth.accessToken);
  const novel = useSelector((state) => state.novel);

  const dispatch = useDispatch();

  useEffect(() => {
      // const decodedToken = jwtDecode(token);
      dispatch(fetchNovelData());
    
  }, []);


  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/novel/:id" exact element={<ReadNovel />} />
          <Route path="/poem/:id" exact element={<ReadPoem />} />
          <Route path="/post/:id" exact element={<ReadPost />} />

          <Route
            path="/admin"
            element={
              <AddSidebarAndTopbar>
                <Dashboard />
              </AddSidebarAndTopbar>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/website"
            element={
              <AddSidebarAndTopbar>
                <Website />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/about"
            element={
              <AddSidebarAndTopbar>
                <About />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/novels"
            element={
              <AddSidebarAndTopbar>
                <Novels />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <AddSidebarAndTopbar>
                <Posts />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/poems"
            element={
              <AddSidebarAndTopbar>
                <Poems />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/videos"
            element={
              <AddSidebarAndTopbar>
                <Videos />
              </AddSidebarAndTopbar>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AddSidebarAndTopbar>
                <Testimonials />
              </AddSidebarAndTopbar>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
