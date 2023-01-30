import { Box } from '@mui/material'
import React from 'react'

function MuiBox() {
  return (
    <Box sx={{
        width:'100px',
        height: '100px',
        color: 'white',
        backgroundColor: 'primary.main',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: 'primary.light',
        }
    }}>
      Hello from Box
    </Box>
  )
}

export default MuiBox
