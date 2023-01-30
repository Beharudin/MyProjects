import React from 'react'
import {styled ,Box, ThemeProvider, createTheme} from '@mui/material'
import { mytheme } from './MyTheme';

const theme=createTheme({
    palette: {
        primary: {
            main: "#9ded13",
        },
        secondary: {
            main: "#9ded13",
        },
        neutral: {
            main: 'grey'
        },
    },
    status: {
        danger: 'red',
    }
});


function MuiTheme() {
  return (
    // <ThemeProvider theme={theme}>
    <ThemeProvider theme={mytheme}>
    <>
    <Box
    sx={{
        backgroundColor: 'primary.main',
        height: 400,
        width:400,
        '&:hover':{
            backgroundColor:'secondary.dark',
            borderRadius: "50%",
        },
    }}>
       Mui theme
    </Box> 
    {/* <Box
    sx={{
        backgroundColor: theme.status.danger,
        height: 400,
        width:400,
        '&:hover':{
            backgroundColor:'info.dark',
            borderRadius: "50%",
        },
    }}>
      Mui theme
    </Box> */}

    <Box
    sx={{
        backgroundColor: 'warning.dark',
        height: 400,
        width:400,
        '&:hover':{
            backgroundColor:'primary.dark',
            borderRadius: "50%",
        },
    }}>
      Mui theme
    </Box>
    </>
    </ThemeProvider>
  )
}

export default MuiTheme
