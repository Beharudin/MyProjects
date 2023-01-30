import React from 'react'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import {PhotoCamera, Send, Delete} from '@mui/icons-material';
import './mystyle.css'

function MuiButton() {
  return (
    <div>
        {/* button variant */}
        <div>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        </div>

        {/* button text */}
        <div>
        <Button>Primary</Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons">Link</Button>
        </div>

        {/* button color */}
        <div>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="success"> Success </Button>
        <Button variant="contained" color="error">Error </Button>
        <Button variant="contained" color="warning"> warning </Button>
        </div>
        <div>
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="medium">
          Medium
        </Button>
        <Button variant="contained" size="large">
          Large
        </Button>
        </div>
        <div>
            {/* Upload button  */}
            <Button variant="contained" component="label">Upload
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
            <PhotoCamera />
            </IconButton>
        </div>
        <div>
        {/* Buttons with icons and label */}
        <Button variant="outlined" startIcon={<Delete />}>
        Delete
        </Button>
        <Button variant="contained" endIcon={<Send />}>
        Send
        </Button>
        </div>

        {/* Button group */}
        <div>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        </div>

         {/* Button group */}
         <div>
        <ButtonGroup  variant="contained" aria-label="outlined primary button group">
          <Button className='mybtn'>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        </div>
    </div>
  )
}

export default MuiButton
