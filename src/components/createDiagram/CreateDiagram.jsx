import { FormEditor } from '@bpmn-io/form-js-editor';
import { Form } from '@bpmn-io/form-js';
import { useEffect } from 'react';
const CreateDiagram = () => {
  useEffect(() => {
    (async () => {
      const formEditor = new FormEditor({
        container: document.querySelector('#form-editor'),
      });
      const schema = {
        schemaVersion: 3,
        exporter: {
          name: 'form-js (https://demo.bpmn.io)',
          version: '0.3.0',
        },
        components: [
          {
            key: 'name',
            label: 'Text Field',
            type: 'textfield',
            id: 'Field_1jfqw1v',
            description: 'Enter your name ...',
            validate: {
              required: true,
              minLength: 3,
              maxLength: 50,
            },
          },
        ],
        type: 'default',
        id: 'Form_1f88rws',
      };

      console.log(JSON.stringify(schema));
      //edit form & get new schema
      //   await formEditor.importSchema(schema);

      //fill in form & get data
      const form = new Form({
        container: document.querySelector('#form'),
      });

      await form.importSchema(schema);
    })();
  }, []);

  return (
    <>
      <div id='form-editor'></div>
      <div id='form'></div>
    </>
  );
};
export default CreateDiagram;
