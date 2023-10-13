import { Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="products" element={<Products />}/>
        </Route>
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
