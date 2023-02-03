import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import { Box } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';

const StaffHome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
      <Header />
      <Drawer>
        <Notify />
        <SpinLoader />
      </Drawer>
    </Box>
  );
};

export default StaffHome;
