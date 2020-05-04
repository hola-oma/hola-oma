import React from 'react';
import { Typography, Grid } from '@material-ui/core';

interface ICredentialsLeftTitle {
  title: String,
  subtitle: String
}

const CredentialsLeftTitle: React.FC<ICredentialsLeftTitle> = ({ title, subtitle }) => {
  return (
    <Grid item>
    <Typography component="h1" variant="h4">
      {title}
    </Typography>

    <p>{subtitle}</p>
    </Grid>
  )
}

export default CredentialsLeftTitle;
