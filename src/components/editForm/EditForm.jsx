import { FormEditor } from "@bpmn-io/form-js-editor";
import { AppBar, Button, ButtonGroup, Toolbar, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_BACKEND_URL } from "../..";

const exampleSchema = {
  schemaVersion: 3,
  exporter: {
    name: "form-js (https://demo.bpmn.io)",
    version: "0.3.0",
  },
  components: [
    {
      key: "name",
      label: "Text Field",
      type: "textfield",
      id: "Field_1jfqw1v",
      description: "Enter your name ...",
      validate: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
  ],
  type: "default",
  id: "Form_1f88rws",
};

const EditForm = () => {
  const handleSave = () => {};
  const handleReset = () => {};

  useEffect(() => {
    (async () => {
      const schema = await axios.get(`${BASE_BACKEND_URL}/getAllSchemas`);
      const formEditor = new FormEditor({
        container: document.querySelector("#form-editor"),
      });

      //edit form & get new schema
      await formEditor.importSchema(exampleSchema);
    })();
  }, []);

  return (
    <>
      <ButtonGroup
        sx={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          bottom: 0,
          right: 0,
          margin: 3,
          justifyContent: "end",
        }}
      >
        <Button variant="contained" color="success" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </ButtonGroup>
      <div id="form-editor"></div>
    </>
  );
};
export default EditForm;
