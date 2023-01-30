import React from 'react'
import { Autocomplete, Stack, TextField } from '@mui/material'

function MuiAutocomplete() {

    const skills=['Java', 'Javascript', 'Python', 'React', 'C++']
  return (
    <Stack className='mybtn'>
      <Autocomplete options={skills} renderInput={(params)=><TextField {...params} label='Skills'/>}/>
    </Stack>
  )
}

export default MuiAutocomplete
