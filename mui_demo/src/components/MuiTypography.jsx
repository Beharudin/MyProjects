import React from 'react'
import { Typography } from '@mui/material';

function MuiTypography() {
  return (
    <div>
      <Typography variant='h1'>h1 Heading</Typography>
      <Typography variant='h2'>h2 Heading</Typography>
      <Typography variant='h3'>h3 Heading</Typography>
      <Typography variant='h4'>h4 Heading</Typography>
      <Typography variant='h5'>h5 Heading</Typography>
      <Typography variant='h5' component='h1'>h5 Heading component h1</Typography>
      <Typography variant='h6'>h6 Heading</Typography>
      <Typography variant='h6' gutterBottom>h6 Heading gutterBottom</Typography>
      
      <Typography variant='subtitle1'>subtitle1</Typography>
      <Typography variant='subtitle2'>subtitle2</Typography>

      <Typography variant='body1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores at eligendi sed, ea quidem pariatur numquam sint eum earum quasi consequuntur quos iste illo aut dignissimos similique tempora itaque reiciendis.</Typography>
      <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aspernatur natus culpa, voluptates perspiciatis ut nostrum exercitationem. Similique numquam qui rem eos repellat soluta excepturi omnis! Nam quo deleniti modi?</Typography>
    </div>
  )
}

export default MuiTypography
