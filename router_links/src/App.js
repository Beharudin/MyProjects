import {Routes, Route} from 'react-router-dom'
import './app.css'
import About from './components/About';
import Admin from './components/Admin';
import { AuthProvider } from './components/Auth';
import FeatureProducts from './components/FeatureProducts';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NewProducts from './components/NewProducts';
import Nomatch from './components/Nomatch';
import Order_summary from './components/Order_summary';
import Products from './components/Products';
import Profile from './components/Profile';
import RequireAuth from './components/RequireAuth';
import UserDetails from './components/UserDetails';
import Users from './components/Users';
function App() {
  return (
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/order_summary' element={<Order_summary />} />
        <Route path='/products' element={<Products />} >
          <Route index element={<FeatureProducts />} />
          <Route path='featured' element={<FeatureProducts />} />
          <Route path='new' element={<NewProducts />} />
        </Route>
        <Route path='/users' element={<Users />} />
        <Route path='/users/:userId' element={<UserDetails />} />
        <Route path='/users/admin' element={<Admin />} />
        <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Nomatch />} />
      </Routes>
      </AuthProvider>
  );
}

export default App;
