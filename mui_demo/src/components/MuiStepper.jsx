import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function MuiStepper() {
    const [activceStep, setActivceStep]=useState(0);

    const nextHandler=()=>{
        setActivceStep(activceStep+1);
    }

    const backHandler=()=>{
        setActivceStep(activceStep-1);
    }

  return (
    <div>
        <Box sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display:'flex',
        }}>
           <Stepper sx={{
            width:'50%',
            height: '400px',
            border: '1px solid',
            alignItems: 'center',
            justifyContent: 'center',
        }} activeStep={activceStep}>
           <Step><StepLabel >One</StepLabel></Step>
           <Step><StepLabel>Two</StepLabel></Step>
           <Step><StepLabel>Three</StepLabel></Step>
           <Step><StepLabel>Four</StepLabel></Step>
          </Stepper>
          
      </Box>
      <Box sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display:'flex',
        }}>
      <Box sx={{
         width:'50%',
         height: '400px',
         alignItems: 'center',
         justifyContent: 'center',
      }}>
      <Button sx={{
            float: 'left',
            marginRight: '50%'
          }} onClick={backHandler} startIcon={<NavigateBefore />} >
            Back
          </Button>
          <Button sx={{
            float: 'right',
          }} onClick={nextHandler} endIcon={<NavigateNext />}>
            Next
        </Button>
      </Box>
      </Box>
    </div>
  )
}

export default MuiStepper
