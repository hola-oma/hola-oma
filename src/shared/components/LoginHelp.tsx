import React from 'react';
import { Typography, Grid, Link } from '@material-ui/core';

const LoginHelp: React.FC = () => {
  return (
    <Grid item>
      <Typography component="p" variant="h6">
        Help
      </Typography>
      <ul className="helpOptions">
        <li>
          <Link href="/resetPassword" className="bigLink">
            Forgot password
          </Link>
        </li>
        <li>
        <Link href="/register" className="bigLink">
          Don't have an account
        </Link>
        </li>
      </ul>
    </Grid>
  )
}

export default LoginHelp;