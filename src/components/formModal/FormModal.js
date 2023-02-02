import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_CAMADPTR_URL, cookies } from '../..';
import { Form } from '@bpmn-io/form-js-viewer';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import { authActions } from '../../store/auth';

export const FormModal = ({ setToDashboard, taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formFetched, setFormFetched] = useState(false);
  const userId = cookies.get('userId');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const form = new Form({
    container: document.querySelector('#modal-form'),
  });

  const closeModal = () => {
    setIsOpen(!isOpen);
    setToDashboard();
  };

  const fetchFormSchema = async () => {
    const resp = taskId
      ? ''
      : await axios.get(`${BASE_CAMADPTR_URL}/getStartFormSchema`);

    document.getElementById('modal-form').innerHTML = '<div></div>';
    await form.attachTo('#modal-form');
    await form.importSchema(resp.data);
    setFormFetched(true);
  };
  form.on('changed', (e) => console.log('eeee', e));
  form.on('submit', async (e) => {
    try {
      setFormLoading(true);
      const error = form.validate();
      if (!Object.values(error)[0]) {
        const body = {
          customerId: userId,
          variables: e.data,
        };
        //post submitStartForm or submitTaskForm apis here
        const resp = taskId
          ? await axios.post(`${BASE_CAMADPTR_URL}/submitFrom?taskId=x`)
          : await axios.post(`${BASE_CAMADPTR_URL}/submitStartForm`, body);
        console.log('resp.data', resp.data);
        if (!taskId)
          dispatch(
            authActions.updateUserData({
              userData: { ...userData, pId: resp.data },
            })
          );
        dispatch(
          uiActions.notif({
            type: 'success',
            msg: 'Loan process started successfully',
          })
        );
      }
      setFormLoading(false);
      closeModal();
    } catch (err) {
      setFormLoading(false);
      closeModal();
      dispatch(
        uiActions.notif({
          type: 'error',
          msg: err.response?.data,
        })
      );
    }
  });

  useEffect(() => {
    if (!taskId) fetchFormSchema();
  }, []);

  const TaskDescription = () => {
    return (
      <Typography sx={{ margin: 'auto' }}>
        {!taskId &&
          'Initiate your loan request by choosing a registration method'}
      </Typography>
    );
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={closeModal} maxWidth={'sm'}>
        <DialogTitle>
          <TaskDescription />
        </DialogTitle>

        {(!formFetched || formLoading) && (
          <DialogContent sx={{ margin: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </DialogContent>
        )}
        <DialogContent id='modal-form'></DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
