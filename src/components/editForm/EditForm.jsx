import { FormEditor } from '@bpmn-io/form-js-editor';
import { Box, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { BASE_CAMADPTR_URL } from '../..';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';

const EditForm = () => {
  const dispatch = useDispatch();
  const [schemaIndex, setSchemaIndex] = useState(0);
  const [schemas, setSchemas] = useState([]);

  const formEditor = new FormEditor({
    container: document.querySelector('#form-editor'),
  });
  const handleSave = () => {};
  const handleReset = () => {};
  const handleNext = async () => {
    if (schemaIndex < schemas.length - 1) {
      const newIndex = schemaIndex + 1;
      setSchemaIndex(newIndex);
      document.getElementById('form-editor').innerHTML = '<div></div>';
      await formEditor.attachTo('#form-editor');

      await formEditor.importSchema(schemas[newIndex]);
    }
  };
  const handlePrev = async () => {
    if (schemaIndex > 0) {
      const newIndex = schemaIndex - 1;
      setSchemaIndex(newIndex);
      document.getElementById('form-editor').innerHTML = '<div></div>';
      await formEditor.attachTo('#form-editor');
      await formEditor.importSchema(schemas[newIndex]);
    }
  };

  const loadSchemas = async () => {
    dispatch(uiActions.startLoad());

    const resp = await axios.get(`${BASE_CAMADPTR_URL}/getAllFormSchemas`);

    //edit form & get new schema
    setSchemas(JSON.parse(JSON.stringify(resp.data)));
    await formEditor.attachTo('#form-editor');
    await formEditor.importSchema(
      JSON.parse(JSON.stringify(resp.data))[schemaIndex]
    );
    dispatch(uiActions.stopLoad());
  };

  useEffect(() => {
    loadSchemas();
  }, [dispatch]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <ButtonGroup
          sx={{
            position: 'fixed',
            zIndex: 1000,
            width: '100%',
            bottom: 0,
            right: 0,
            margin: 3,
            marginBottom: 9,
            justifyContent: 'end',
          }}
        >
          <Button onClick={handlePrev} disabled={schemaIndex === 0}>
            <ChevronLeftIcon />
            previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={schemaIndex === schemas.length - 1}
          >
            next
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>

        <ButtonGroup
          sx={{
            position: 'fixed',
            zIndex: 1000,
            width: '100%',
            bottom: 0,
            right: 0,
            margin: 3,
            justifyContent: 'end',
          }}
        >
          <Button variant='contained' color='success' onClick={handleSave}>
            Save
          </Button>
          <Button variant='contained' color='secondary' onClick={handleReset}>
            Reset
          </Button>
        </ButtonGroup>
      </Box>
      <div id='form-editor'></div>
    </>
  );
};
export default EditForm;
