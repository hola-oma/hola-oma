import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

const Child: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Grid item {...gridProps}>
      {children}
    </Grid>
  )
}

export default Child;