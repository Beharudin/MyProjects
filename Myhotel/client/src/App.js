import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import AdminPage from "./pages/AdminPage";
import Booking from "./pages/Booking";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="h-100">  
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/book/:roomid" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
