import React from 'react';
import { Typography, Link, Grid, Box } from '@material-ui/core';

const Copyright: React.FC = () => {
  return (
    <Grid item xs={12} className="redBorder">
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Hola Oma team
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Grid>
  )
}

export default Copyright;