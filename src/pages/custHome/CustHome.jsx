import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import HistoryIcon from '@mui/icons-material/History';
import MapIcon from '@mui/icons-material/Map';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, imageListClasses } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';
import { uiActions } from '../../store/ui';
import { authActions } from '../../store/auth';

const opts = [
  { text: 'New Loan', icon: [<AddCircleIcon />] },
  { text: 'See Loan Status', icon: [<MapIcon />] },
  { text: 'History', icon: [<HistoryIcon />] },
];

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
      //if cust has no running process then get processStarting task/form
      if (resp.data.length < 1) {
        const resp2 = await axios.get(`${BASE_CAMADPTR_URL}/getStartFormKey`);

        setProps({ formKey: resp2.data });
      }
      // dispatch(authActions.updateUserData(payload: {...userData, currentTaskForm: }))
      const optsWithOutNew = opts.filter((el) => el.text != 'New Loan');
      const optsWithOutStatus = opts.filter(
        (el) => el.text != 'See Loan Status'
      );
      if (resp.data.length > 0) {
        setDrawerOptions(optsWithOutNew);
      } else {
        setDrawerOptions(optsWithOutStatus);
      }
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
      <Drawer
        drawerOptions={drawerOptions}
        reloadDrawerOptions={reloadDrawerOptions}
        props={props}
      >
        <Notify />
        <SpinLoader />
      </Drawer>
    </Box>
  );
};
export default CustHome;
