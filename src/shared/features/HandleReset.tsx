import React, { useState, useEffect } from "react";
import * as QueryString from "query-string"

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from 'shared/components/Copyright';

import HelpIcon from '@material-ui/icons/Help';

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { useHistory, Link } from "react-router-dom";
import { RouteComponentProps, useLocation } from 'react-router-dom'; // give us 'history' object
import { Avatar } from "@material-ui/core";

import { verifyActionCode, resetPassword } from 'services/user';
import Alert from "@material-ui/lab/Alert";
import BigInput from "shared/components/BigInput/BigInput";

interface MatchParams {
  mode: string;
}

interface IHandleReset extends RouteComponentProps<MatchParams> {
  props: RouteComponentProps;
}

const HandleReset: React.FC<IHandleReset> = () => {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");

  const [error, setErrors] = useState("");

  const location = useLocation();

  const params = QueryString.parse(location.search);

  const updatePassword = (e: any) => {
    setNewPassword(e.target.value);
  }

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

  /* RESET PASSWORD */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await resetPassword(actionCode, newPassword);
      setErrors("");
      setResetSent(true); // hide form, display link back to login page 
    } catch(e) {
      // possible errors include weak password and expired auth code 
      setErrors(e.message);
    }
  }

  const goToLogin = () => {
    console.log("going to login page");
    history.replace('/login');
  }

  return (
    <Grid container>
      <Container component="main" maxWidth="xs">
        <br/>
        {/* If the user arrives on this page with an invalid oobCode, don't show the form, just show the error message */}
        {!email && 
          <Grid container spacing={2}>
            <Grid item xs={12}>
            {error &&
              <Alert className="error" severity="error">{error}</Alert>
            }
            <br/>
            <Link to="/resetPassword">Try again</Link>
            </Grid>
          </Grid>
        }

        {email && 
          <>
          <div>
            {!resetSent && 
              <>
                <Avatar className="formAvatar">
                  <HelpIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Enter a new password 
                </Typography>
                <p>for <b>{email}</b></p>

              <form onSubmit={e => handleForm(e)} className="">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <BigInput 
                      labelText="New password"
                      name="password"
                      required={true}
                      value={newPassword}
                      autoFocus={true}
                      autoComplete="off"
                      type="password"
                      onChange={updatePassword}/>
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
              </>
            }

            {error &&
              <Alert className="error" severity="error">{error}</Alert>
            }

            {resetSent && 
              <>
              <Typography component="h1" variant="h4">
                  Success!
                </Typography>
              <p>Password for <b>{email}</b> has been reset.</p>
              <Button className="bigButton" variant="contained" color="primary" onClick={() => {goToLogin()}}>Return to login</Button>
              </>
            }
        
        </div>
        <Box mt={8}>
          <Copyright />      
        </Box>
        </>
      } {/* if email exists */ }

      </Container>
    </Grid>
  );
};

export default HandleReset;