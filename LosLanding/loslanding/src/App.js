import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
