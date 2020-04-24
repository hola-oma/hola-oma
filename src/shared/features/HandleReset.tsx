import React, { useState, useEffect } from "react";
import * as QueryString from "query-string"

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

import { RouteComponentProps, useLocation, Link } from 'react-router-dom'; // give us 'history' object
import { Avatar } from "@material-ui/core";

import { verifyActionCode, resetPassword } from 'services/user';

interface MatchParams {
  mode: string;
}

interface IHandleReset extends RouteComponentProps<MatchParams> {
  props: RouteComponentProps;
}

/* This page is where we set the display name and account type */
/* Separated from main Register page to make the Register page less overwhelming */

const HandleReset: React.FC<IHandleReset> = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");

  const [error, setErrors] = useState("");

  const location = useLocation();

  const params = QueryString.parse(location.search);

  useEffect(() => {
    verifyActionCode(params?.oobCode as string)
      .then((email: string) => {
        setEmail(email);
      })
      .catch((error) => {
        setErrors(error.message);
      })
  }, []);

  useEffect(() => {
    setMode(params?.mode as string); // "resetPassword"
    setActionCode(params?.oobCode as string); // long string
  }, []);

  /* ADD USER ROLE TYPE AND DISPLAY NAME TO USER SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await resetPassword(actionCode, newPassword);
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
          Enter a new password 
        </Typography>
        <p>for <b>{email}</b></p>

        {!resetSent && 
          <>
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
                  label="New password"
                  autoFocus
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
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
              Save
            </Button>

          </form>
          <span className="error">{error}</span>
          </>
        }

        {resetSent && 
          <>
          <p>Password reset! You may log in.</p>
          <Link to="/login">Click here to log in</Link>
          </>
        }
      
      </div>
      <Box mt={8}>
        <Copyright />      
      </Box>
    </Container>
    </Grid>
  );
};

export default HandleReset;