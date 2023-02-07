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
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import { authActions } from '../../store/auth';
import { Label } from '@mui/icons-material';
import { height } from '@mui/system';
export const FormModal = ({ resetBackground, taskId, taskDesc }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [fecthedFormData, setFecthedFormData] = useState(null);
  const [displayVariables, setDisplayVariables] = useState(null);
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

  const loadDisplayVariables = async () => {
    //fetch input variables
    const resp2 = await axios.get(
      `${BASE_CAMADPTR_URL}/getDisplayVariables?taskId=${taskId}`
    );
    if (resp2.data) setDisplayVariables(resp2.data);
  };

  const fetchFormSchema = async () => {
    dispatch(uiActions.startLoad());
    try {
      const resp = taskId
        ? await axios.get(`${BASE_CAMADPTR_URL}/getFormSchema?taskId=${taskId}`)
        : await axios.get(`${BASE_CAMADPTR_URL}/getStartFormSchema`);
      if (resp.data) {
        document.getElementById('modal-form').innerHTML = '<div></div>';
        await form.attachTo('#modal-form');
        await form.importSchema(resp.data);
        setFecthedFormData(resp.data);
        if (taskId) loadDisplayVariables();
      } else {
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getTaskVariables?taskId=${taskId}`
        );
        //assuming this is a special case we'll write its own specific solution
        const variable = resp2.data;
        Object.keys(resp2.data).forEach((key) => {
          variable[key] = { value: userId };
        });
        const body = {
          variables: variable,
        };
        console.log(body);
        await axios.post(
          `${BASE_CAMADPTR_URL}/completeTask?taskId=${taskId}`,
          body
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
          msg: err.response?.data ? err.response?.data : err,
        })
      );
      console.log(err);
    }
    dispatch(uiActions.stopLoad());
  };
  form.on('submit', async (e) => {
    try {
      const error = form.validate();
      if (!Object.values(error)[0]) {
        setFormLoading(true);

        const variable = { ...e.data };
        Object.keys(e.data).forEach((key) => {
          variable[key] = { value: e.data[key] };
        });
        const body = taskId
          ? {
              variables: variable,
            }
          : {
              customerId: userId,
              variables: e.data,
            };
        //post submitStartForm or submitTaskForm apis here
        const resp = taskId
          ? await axios.post(
              `${BASE_CAMADPTR_URL}/submitForm?taskId=${taskId}`,
              body
            )
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
              taskDesc: resp2.data.candidateGroupIsCustomer
                ? resp2.data?.desc
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

  const TaskDescription = () => {
    return (
      <Typography sx={{ margin: 'auto' }}>{taskDesc && taskDesc}</Typography>
    );
  };

  useEffect(() => {
    fetchFormSchema();
  }, []);

  const DisplayForm = () => {
    const displayForm = [];
    for (let i = 0; i < Object.keys(displayVariables).length; i = i + 2) {
      const x = (y) =>
        Object.keys(displayVariables)[y] && (
          <td>
            <TextField
              label={Object.keys(displayVariables)[y]}
              defaultValue={
                displayVariables[Object.keys(displayVariables)[y]].value
              }
              disabled
              sx={{ margin: 2 }}
            />
          </td>
        );
      displayForm.push(
        <tr>
          {x(i)} {x(i + 1)}
        </tr>
      );
    }
    return <FormControl sx={{ margin: 'auto' }}>{displayForm}</FormControl>;
  };
  return (
    <div>
      <Dialog
        sx={{
          visibility: fecthedFormData ? true : false,
        }}
        open={isOpen}
        onClose={closeModal}
        fullWidth={displayVariables ? true : false}
        scroll={displayVariables ? 'body' : 'paper'}
      >
        <DialogTitle>
          <TaskDescription />
        </DialogTitle>
        {displayVariables && (
          <Box sx={{ display: 'flex' }}>
            <DisplayForm />
          </Box>
        )}
        {formLoading && (
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
