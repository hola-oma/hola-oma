import React from 'react';
import { Typography, Link, Box } from '@material-ui/core';
import Row from './Row/Row';

const Copyright: React.FC = () => {
  return (
    <Row id="copyrightRow" alignContent="flex-end" alignItems="flex-end" justify="center">
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
    </Row>
  )
}

export default Copyright;