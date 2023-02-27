import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {mytheme } from "./theme";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
      <ThemeProvider theme={mytheme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
           <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
             <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              {/* <Route path="/topbar" element={<Topbar />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
  <Route path="/faq" element={<FAQ />} /> */}
             </Routes>  
          </main> 
        </div>
      </ThemeProvider>
  );
}

export default App;
