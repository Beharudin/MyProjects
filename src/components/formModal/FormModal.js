import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_CAMADPTR_URL } from '../..';
import { Form } from '@bpmn-io/form-js';

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

export const FormModal = ({ formKey, setToDashboard, taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formFetched, setFormFetched] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setToDashboard();
  };

  const fetchFormSchema = async () => {
    const form = new Form({
      container: document.querySelector('#modal-form'),
    });

    const resp = await axios.get(
      `${BASE_CAMADPTR_URL}/getStartFormSchema?formKey=${formKey}`
    );
    document.getElementById('modal-form').innerHTML = '<div></div>';
    await form.attachTo('#modal-form');
    await form.importSchema(resp.data);
    setFormFetched(true);
  };

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
      <Dialog open={isOpen} onClose={toggleModal} maxWidth={'sm'}>
        <DialogTitle>
          <TaskDescription />
        </DialogTitle>

        {!formFetched && (
          <DialogContent sx={{ margin: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </DialogContent>
        )}
        <DialogContent id='modal-form'></DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>Close</Button>
          <Button>Sumbit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
