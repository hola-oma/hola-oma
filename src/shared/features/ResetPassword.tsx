import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from 'shared/components/Copyright';

import HelpIcon from '@material-ui/icons/Help';

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object
import { Avatar } from "@material-ui/core";

import { sendPasswordResetEmail } from 'services/user';

interface IResetPassword extends RouteComponentProps<any> {
}

/* This page is where we set the display name and account type */
/* Separated from main Register page to make the Register page less overwhelming */

const ResetPassword: React.FC<IResetPassword> = () => {

  const [emailForReset, setEmailForReset] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [error, setErrors] = useState("");

  /* ADD USER ROLE TYPE AND DISPLAY NAME TO USER SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(emailForReset);
      setResetSent(true);
    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    <Grid container>
    <Container component="main" maxWidth="xs">
      <div>
        <Avatar className="formAvatar">
          <HelpIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Reset password
        </Typography>
        <p>Enter your username and we’ll send a link to reset your password.</p>

        <form onSubmit={e => handleForm(e)} className="">

        <Grid container spacing={2}>
            {/* Display name */}
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your email address"
                autoFocus
                value={emailForReset}
                onChange={e => setEmailForReset(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="bigButton"
          >
            Send e-mail
          </Button>

        </form>
        <span className="error">{error}</span>
        {resetSent && 
          <span>E-mail sent! Check your inbox.</span>
        }
      </div>
      <Box mt={8}>
        <Copyright />      
      </Box>
    </Container>
    </Grid>
  );
};

export default ResetPassword;