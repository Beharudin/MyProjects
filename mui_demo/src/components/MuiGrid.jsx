import { Box, Grid } from '@mui/material'
import React from 'react'
import './mystyle.css'

function MuiGrid() {
  return (
    <Grid container spacing={2} sx={{
        
        }}>
        <Grid item xs={8} className='gridItem'>
            <Box className='gridBox' sx={{
                width:'100%',
                height: '100px',
                color: 'white',
                margin: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'primary.main',
                '&:hover':{
                    backgroundColor: 'primary.light',
                }
            }}>
                Hello from Box
            </Box>
        </Grid><Grid item xs={4}>
            <Box sx={{
                width:'100%',
                height: '100px',
                color: 'white',
                margin: '5px',
                backgroundColor: 'primary.main',
                cursor: 'pointer',
                '&:hover':{
                    backgroundColor: 'primary.light',
                }
            }}>
                Hello from Box
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box sx={{
                width:'100%',
                height: '100px',
                color: 'white',
                margin: '5px',
                backgroundColor: 'primary.main',
                cursor: 'pointer',
                '&:hover':{
                    backgroundColor: 'primary.light',
                }
            }}>
                Hello from Box
            </Box>
        </Grid>
        <Grid item xs={6}>
            <Box sx={{
                width:'100%',
                height: '100px',
                color: 'white',
                margin: '5px',
                backgroundColor: 'primary.main',
                cursor: 'pointer',
                '&:hover':{
                    backgroundColor: 'primary.light',
                }
            }}>
                Hello from Box
            </Box>
        </Grid>
    </Grid>
  )
}

export default MuiGrid
