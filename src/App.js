import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/Dashboard";
import Testimonials from "./scenes/testimonials/Testimonials";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { mytheme } from "./theme";
import Services from "./scenes/services/Services";
import About from "./scenes/about/About";
import Messages from "./scenes/message/Messages";
import JsonData from './scenes/data/data.json'
import FAQ from "./scenes/faq/Faq";
import Website from "./scenes/website/Website";
import Features from "./scenes/features/Features";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services data={landingPageData.Services} />} />
            <Route path="/about" element={<About data={landingPageData.About} />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/website" element={<Website />} />
            <Route path="/features" element={<Features data={landingPageData.Features} />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
