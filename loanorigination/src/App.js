import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import StatusBar from './components/status/StatusBar';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Rightbar from './components/rightbar/Rightbar';

function App() {
  return  (
    <>
    <Topbar />
    <div style={{display:'flex'}}>
      <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/status' element={<StatusBar />} />
        </Routes>
    </div>

    </>
  );
}

export default App;
