import React from 'react';
import { Typography, Link, Box } from '@material-ui/core';
import Child from './Child/Child';

const Copyright: React.FC = () => {
  return (
    <Child xs={12} container alignContent="flex-end" justify="center">
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/about">
            Hola Oma team
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Child>
  )
}

export default Copyright;