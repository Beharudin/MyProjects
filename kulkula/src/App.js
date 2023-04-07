import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/body/Homepage";
import PageNotFound from "./components/notfound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        {/* <Route path="/admin" element={<Mytasks />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
