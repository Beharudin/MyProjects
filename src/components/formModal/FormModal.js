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

let fecthedFormDataVar = null;

export const FormModal = ({ resetBackground, taskId, taskDesc, loanType }) => {
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
        fecthedFormDataVar = resp.data;
        if (taskId) loadDisplayVariables();
      } else {
        //assuming we'll only ever use userId as the value for variables
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getTaskVariables?taskId=${taskId}`
        );
        const variable = resp2.data;
        Object.keys(resp2.data).forEach((key) => {
          variable[key] = { value: userId };
        });
        const body = {
          variables: variable,
        };
        await axios.post(
          `${BASE_CAMADPTR_URL}/completeTask?taskId=${taskId}&userId=${userId}`,
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
        //if there is a hidden feild and the name of field is loanType:
        if (
          fecthedFormDataVar?.components
            .map((el) => el.key)
            .includes('loanType') &&
          loanType
        ) {
          body.variables.loanType = loanType.toLowerCase();
        }
        //post submitStartForm or submitTaskForm apis here
        const resp = taskId
          ? await axios.post(
              `${BASE_CAMADPTR_URL}/submitForm?taskId=${taskId}`,
              body
            )
          : await axios.post(`${BASE_CAMADPTR_URL}/submitStartForm`, body);

        //fetch latest task for customer
        const resp2 = await axios.get(
          `${BASE_CAMADPTR_URL}/getLatestTaskForCustomer?customerId=${userId}&loanType=${loanType}`
        );
        const uData = {
          ...userData,
          biz_pId:
            loanType === 'business'
              ? taskId
                ? userData.biz_pId
                : resp.data
              : userData.biz_pId,
          pers_pId:
            loanType === 'personal'
              ? taskId
                ? userData.pers_pId
                : resp.data
              : userData.pers_pId,
          biz_taskId:
            loanType === 'business'
              ? resp2.data.candidateGroupIsCustomer
                ? resp2.data?.taskId
                : null
              : userData.biz_taskId,
          pers_taskId:
            loanType === 'personal'
              ? resp2.data.candidateGroupIsCustomer
                ? resp2.data?.taskId
                : null
              : userData.pers_taskId,
          biz_taskDesc:
            loanType === 'business'
              ? resp2.data.candidateGroupIsCustomer
                ? resp2.data?.desc
                : null
              : userData.biz_taskDesc,
          pers_taskDesc:
            loanType === 'personal'
              ? resp2.data.candidateGroupIsCustomer
                ? resp2.data?.desc
                : null
              : userData.pers_taskDesc,
        };
        dispatch(
          authActions.updateUserData({
            userData: uData,
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
