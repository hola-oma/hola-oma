import React from 'react';
import { Grid, GridProps } from '@material-ui/core';

const Column: React.FC<GridProps> = ({ children, ...gridProps }) => {
  return (
    <Grid container direction="column" {...gridProps}>
      {children}
    </Grid>
  )
}

export default Column;