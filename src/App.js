// import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Service from "./pages/service/Service";
import Login from "./pages/login/Login";
import AdminHome from "./pages/adminHome/AdminHome";
import CustHome from "./pages/custHome/CustHome";
import StaffHome from "./pages/staffHome/StaffHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/home" element={<CustHome />} />
        <Route path="/staff" element={<StaffHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/single/:id" element={<Single />} />
        {/* <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/update/:id" element={user ? <Update /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:postId" element={<Single />} />
        <Route path="/category" element={user ? <Category /> : <Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
