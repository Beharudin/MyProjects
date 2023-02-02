import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import { Box, imageListClasses } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';
import { uiActions } from '../../store/ui';
import { authActions } from '../../store/auth';

const CustHome = () => {
  const userId = cookies.get('userId');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [drawerOptions, setDrawerOptions] = useState([]);
  const [pId, setPid] = useState('');
  const userData = useSelector((state) => state.auth.userData);
  const [props, setProps] = useState({});

  //+ new loan option will diverge into new biz and new mortg options after
  //we include stage 6+
  const reloadDrawerOptions = async () => {
    try {
      const resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getRunningProcessForCustomer?customerId=${userId}`
      );
      if (resp.data.length > 0)
        dispatch(
          authActions.updateUserData({
            userData: { ...userData, pId: resp.data },
          })
        );
    } catch (err) {
      dispatch(uiActions.stopLoad());
      const msg = err.response?.data?.error;
      dispatch(
        uiActions.notif({
          type: 'error',
          msg,
        })
      );
    }
  };

  useEffect(() => {
    reloadDrawerOptions();
  }, [isLoggedIn]);

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
      <Drawer props={props}>
        <Notify />
        <SpinLoader />
      </Drawer>
    </Box>
  );
};
export default CustHome;
