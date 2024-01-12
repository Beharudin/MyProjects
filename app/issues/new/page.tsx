"use client";
import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";  

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
        <SimpleMDE />
        <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
