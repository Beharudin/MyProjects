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
import Sidebar from "./admin/scenes/global/Sidebar";
import Topbar from "./admin/scenes/global/Topbar";
import { useState } from "react";
import { mytheme } from "./theme";
import About from "./admin/scenes/about/About";
import Posts from "./admin/scenes/posts/Posts";
import Videos from "./admin/scenes/videos/Videos";

function App() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isTopbar, setIsTopbar] = useState(false);
  const location = useLocation().pathname;
  useEffect(() => {
    if (
      location === "/admin" ||
      location === "/admin/" ||
      location === "/admin/novels" ||
      location === "/admin/novels/" ||
      location === "/admin/poems" ||
      location === "/admin/poems/" ||
      location === "/admin/posts" ||
      location === "/admin/posts/" ||
      location === "/admin/about" ||
      location === "/admin/about/" ||
      location === "/admin/videos" ||
      location === "/admin/videos/" ||
      location === "/admin/testimonials" ||
      location === "/admin/testimonials/" ||
      location === "/admin/website" ||
      location === "/admin/website/"
    ) {
      setIsSidebar(true);
      setIsTopbar(true);
    }
  }, [location]);

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="app">
        {isSidebar ? <Sidebar isSidebar={isSidebar} /> : null}
        <main className="content">
          {isTopbar ? <Topbar setIsSidebar={setIsSidebar} /> : null}
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/novel/:id" exact element={<ReadNovel />} />
            <Route path="/poem/:id" exact element={<ReadPoem />} />
            <Route path="/post/:id" exact element={<ReadPost />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/website" element={<Website />} />
            <Route path="/admin/about" element={<About />} />
            <Route path="/admin/novels" element={<Novels />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/poems" element={<Poems />} />
            <Route path="/admin/videos" element={<Videos />} />
            <Route path="/admin/testimonials" element={<Testimonials />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
