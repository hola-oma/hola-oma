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
import Alert from "@material-ui/lab/Alert";
import BigInput from "shared/components/BigInput/BigInput";

interface IResetPassword extends RouteComponentProps<any> {
  // empty for now 
}

const ResetPassword: React.FC<IResetPassword> = () => {

  const [emailForReset, setEmailForReset] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [error, setErrors] = useState("");

  const updateEmailForReset = (e: any) => {
    setEmailForReset(e.target.value);
  }

  /* REQUEST A PASSWORD RESET EMAIL BE SENT TO THIS EMAIL ADDRESS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(emailForReset);
      setErrors("");
      setResetSent(true);
    } catch(e) {
      // possible errors include email address doesn't exist in db 
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
            <Grid item xs={12}>
              <BigInput 
                labelText="E-Mail Address"
                name="email"
                required={true}
                value={emailForReset}
                autoFocus={true}
                autoComplete="current-email"
                type="text"
                onChange={updateEmailForReset}/>
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
        {error &&
          <Alert className="error" severity="error">{error}</Alert>
        }
        {resetSent && 
          <Alert severity="success">E-mail sent! Check your inbox.</Alert>
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