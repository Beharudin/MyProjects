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

export const FormModal = ({ resetBackground, taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formFetched, setFormFetched] = useState(false);
  const userId = cookies.get('userId');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const form = new Form({
    container: document.querySelector('#modal-form'),
  });

  const closeModal = (e, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsOpen(!isOpen);
    resetBackground();
  };

  const fetchFormSchema = async () => {
    const resp = taskId
      ? await axios.get(`${BASE_CAMADPTR_URL}/getFormSchema?taskId=${taskId}`)
      : await axios.get(`${BASE_CAMADPTR_URL}/getStartFormSchema`);
    document.getElementById('modal-form').innerHTML = '<div></div>';
    await form.attachTo('#modal-form');
    await form.importSchema(resp.data);
    setFormFetched(true);
  };
  form.on('submit', async (e) => {
    try {
      const error = form.validate();
      if (!Object.values(error)[0]) {
        setFormLoading(true);

        const body = {
          customerId: userId,
          variables: e.data,
        };
        //post submitStartForm or submitTaskForm apis here
        const resp = taskId
          ? await axios.post(`${BASE_CAMADPTR_URL}/submitForm?taskId=${taskId}`)
          : await axios.post(`${BASE_CAMADPTR_URL}/submitStartForm`, body);

        //fetch latest task for customer
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}`
        );
        dispatch(
          authActions.updateUserData({
            userData: {
              ...userData,
              pId: taskId ? userData.pId : resp.data,
              taskId: resp2.data.candidateGroupIsCustomer
                ? resp2.data?.taskId
                : null,
            },
          })
        );
        dispatch(
          uiActions.notif({
            type: 'success',
            msg: 'Operation successfull',
          })
        );
        setFormLoading(false);
        closeModal();
      }
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
    fetchFormSchema();
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
