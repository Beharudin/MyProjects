import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { AuthProvider } from "./components/Auth";

function App() {
  const location = useLocation().pathname;

  return (
    <AuthProvider>
      <div className="App">
        {location === "/" ? (
          <div className="mydiv">
            <h5>Welcome!</h5>
            <a href="/home">
              <button>Home page</button>
            </a>
          </div>
        ) : null}
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
