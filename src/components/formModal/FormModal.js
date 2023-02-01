import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_CAMADPTR_URL } from '../..';
import { StyledModal } from '../dataTable/DataTableStyle.js';
import { ModalProvider } from 'styled-react-modal';
import { FormEditor } from '@bpmn-io/form-js-editor';
import { Box, Button, Dialog, Modal, Typography } from '@mui/material';

export const FormModal = ({ formKey, setToDashboard, taskId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleModal = () => {
    setIsOpen(!isOpen);
    setToDashboard();
  };
  const formEditor = new FormEditor({
    container: document.querySelector('#modal-form'),
  });

  const fetchFormSchema = async () => {
    const resp = await axios.get(
      `${BASE_CAMADPTR_URL}/getStartFormSchema?formKey=${formKey}`
    );
    document.getElementById('modal-form').innerHTML = '<div></div>';
    await formEditor.attachTo('#modal-form');
    await formEditor.importSchema(resp.data);
  };

  useEffect(() => {
    console.log(
      `document.getElementById('modal-form')`,
      document.getElementById('modal-form')
    );

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

  const TaskHeader = () => {
    return (
      <Box sx={{ flexDirection: 'column' }}>
        <TaskDescription />
        <Button sx={{ width: '100', margin: 'auto' }} onClick={toggleModal}>
          close
        </Button>
      </Box>
    );
  };

  return (
    <ModalProvider>
      {isOpen && (
        <Box>
          <TaskDescription />
          <Button
            sx={{ width: '100', justifyContent: 'center' }}
            onClick={toggleModal}
          >
            close
          </Button>
        </Box>
      )}
      <div
        id='modal-form'
        style={{
          display: isOpen ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F2FAFFE6',
          borderRadius: '25px',
          border: '2px solid  #00ADEF',
          padding: '20px',
          width: 'fit-content',
          blockSize: 'fit-content',
          margin: 'auto',

          input: {
            borderRradius: '15px',
            border: '2px solid #00adef',
            padding: '10px',
          },
          container: {
            display: 'grid',
            gridTemplateColumns: '1fr',
          },
        }}
      ></div>
    </ModalProvider>
  );
};
