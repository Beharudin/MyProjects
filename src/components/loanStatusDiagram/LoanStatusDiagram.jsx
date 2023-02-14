import axios from 'axios';
import bpmnJs from 'bpmn-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import { authActions } from '../../store/auth';
import { uiActions } from '../../store/ui';
import Legend from '../legend/Legend';

const LoanStatus = ({ loanType }) => {
  const userId = cookies.get('userId');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const fetchDiagram = async () => {
    try {
      const viewer = new bpmnJs({
        container: '#diagramContainer',
      });

      dispatch(uiActions.startLoad());

      //fetch latest task
      const resp2 = await axios.get(
        `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}&loanType=${loanType}`
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

      //fetch diagram
      const resp = await axios.get(`${BASE_CAMADPTR_URL}/getProcessDiagram`);
      //fetch status
      const _resp = await axios.get(
        `${BASE_CAMADPTR_URL}/getProcessStatus?customerId=${userId}&loanType=${loanType}`
      );
      // console.log('resp.data', resp.data);
      console.log('_resp', _resp.data);

      //clear screen
      document.getElementById('canvas').innerHTML = '<div></div>';
      await viewer.attachTo('#canvas');

      //draw diagram
      await viewer.importXML(resp.data);
      viewer.get('canvas').zoom('fit-viewport');

      //fetch completed tasks
      const resp3 = await axios.get(
        `${BASE_CAMADPTR_URL}/getFinishedTasksForCustomer?customerId=${userId}&loanType=${loanType}`
      );
      //color completed tasks
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
  }, [dispatch, loanType]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '90vh',
        justifyContent: 'space-around',
      }}
      id='diagramContainer'
    >
      <div
        id='canvas'
        style={{ order: 1, width: '100%', height: '100%' }}
      ></div>
      <Legend />
    </div>
  );
};
export default LoanStatus;
