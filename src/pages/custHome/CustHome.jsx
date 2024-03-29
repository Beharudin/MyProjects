import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import Drawer from '../../components/drawer/Drawer';
import Header from '../../components/header/Header';
import { Box } from '@mui/material';
import SpinLoader from '../../components/spinloader/SpinLoader';
import Notify from '../../components/notify/Notify';
import { uiActions } from '../../store/ui';
import { authActions } from '../../store/auth';

const CustHome = () => {
  const userId = cookies.get('userId');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [bodyOption, setBodyOption] = useState('dashboard');

  const [count, setCount] = useState(0);
  const [props] = useState({});

  //+ new loan option will diverge into new biz and new mortg options after
  //we include stage 6+
  const getProcessIdForCustomer = async () => {
    try {
      const biz_resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getRunningProcessForCustomer?customerId=${userId}&type=business`
      );
      const pers_resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getRunningProcessForCustomer?customerId=${userId}&type=personal`
      );
      let uData = {
        userData: {
          ...userData,
        },
      };
      if (biz_resp.data.length > 0) {
        //fetch latest taskId for customer
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}&loanType=business`
        );
        uData.userData = {
          ...uData.userData,
          biz_pId: biz_resp.data[0],
          biz_taskId: resp2.data.candidateGroupIsCustomer
            ? resp2.data?.taskId
            : null,
          biz_taskDesc: resp2.data.candidateGroupIsCustomer
            ? resp2.data?.desc
            : null,
        };
      }

      if (pers_resp.data.length > 0) {
        //fetch latest taskId for customer
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}&loanType=personal`
        );
        uData.userData = {
          ...uData.userData,
          pers_pId: pers_resp.data[0],
          pers_taskId: resp2.data.candidateGroupIsCustomer
            ? resp2.data?.taskId
            : null,
          pers_taskDesc: resp2.data.candidateGroupIsCustomer
            ? resp2.data?.desc
            : null,
        };
      }

      dispatch(authActions.updateUserData(uData));

      setCount(1);
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
    getProcessIdForCustomer();
  }, []);

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
      {count > 0 && (
        <Drawer
          props={props}
          setBodyOption={setBodyOption}
          bodyOption={bodyOption}
        >
          <Notify />
          <SpinLoader />
        </Drawer>
      )}
    </Box>
  );
};
export default CustHome;
