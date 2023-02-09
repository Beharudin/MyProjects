import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import { Box } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';
const img = "url('/img/Pattern.svg')";

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
      <div>
        <Drawer>
          <Notify />
          <SpinLoader />
        </Drawer>
      </div>
    </Box>
  );
};

export default StaffHome;
