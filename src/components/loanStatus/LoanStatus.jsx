import axios from 'axios';
import bpmnJs from 'bpmn-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import { authActions } from '../../store/auth';
import { uiActions } from '../../store/ui';
import Legend from '../legend/Legend';

const LoanStatus = () => {
  const userId = cookies.get('userId');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const fetchDiagram = async () => {
    try {
      const viewer = new bpmnJs({
        container: '#diagramContainer',
      });

      dispatch(uiActions.startLoad());

      const resp2 = await axios.get(
        `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}`
      );
      //set pId to null if customer has no pending task
      if (!resp2?.data?.taskDefId) {
        dispatch(
          authActions.updateUserData({
            userData: {
              ...userData,
              pId: null,
            },
          })
        );
        document.getElementById('diagramContainer').innerHTML = '<div></div>';
        dispatch(uiActions.stopLoad());
        return;
      }

      const resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getProcessDiagram?customerId=${userId}`
      );

      //clear screen
      document.getElementById('canvas').innerHTML = '<div></div>';
      await viewer.attachTo('#diagramContainer');

      //draw diagram
      await viewer.importXML(resp.data);
      viewer.get('canvas').zoom('fit-viewport');

      //color completed tasks
      const resp3 = await axios.get(
        `${BASE_CAMADPTR_URL}/getFinishedTasksForCustomer?customerId=${userId}`
      );
      resp3.data.map(
        (el) =>
          (document.querySelector(
            `[data-element-id=${el.taskDefId}]`
          ).children[0].children[0].style.fill = 'rgb(100, 240, 95)')
      );

      //color pending task
      document.querySelector(
        `[data-element-id=${resp2.data.taskDefId}]`
      ).children[0].children[0].style.fill = 'rgb(252, 193, 2)';

      dispatch(uiActions.stopLoad());
    } catch (err) {
      dispatch(uiActions.stopLoad());
      const msg = err.response?.data?.error;
      dispatch(
        uiActions.notif({
          type: 'error',
          msg,
        })
      );
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDiagram();
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      id='diagramContainer'
    >
      <div id='canvas' sx={{ order: 1 }}></div>
      <Legend />
    </div>
  );
};
export default LoanStatus;
