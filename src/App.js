import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import AdminHome from './pages/adminHome/AdminHome';
import CustHome from './pages/custHome/CustHome';
import StaffHome from './pages/staffHome/StaffHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/staff/login' element={<Login />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/home' element={<CustHome />} />
        <Route path='/staff' element={<StaffHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
