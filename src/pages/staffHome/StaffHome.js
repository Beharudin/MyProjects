import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import { Box } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';
import { useState } from 'react';
const img = "url('/img/Pattern.svg')";

const StaffHome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [bodyOption, setBodyOption] = useState('dashboard');
  if (!isLoggedIn) {
    return <Navigate to='/Login' replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header bodyOption={bodyOption} setBodyOption={setBodyOption} />
      <div>
        <Drawer setBodyOption={setBodyOption} bodyOption={bodyOption}>
          <Notify />
          <SpinLoader />
        </Drawer>
      </div>
    </Box>
  );
};

export default StaffHome;
