import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import 'firebase/auth';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object 
import { signUserInWithEmailAndPassword, signUserInWithGoogle, getUserSettings } from "services/user";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from "shared/components/Copyright";
import BigInput from "shared/components/BigInput/BigInput";
import Alert from "@material-ui/lab/Alert";
import { Container } from "@material-ui/core";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";
import LoginHelp from "shared/components/LoginHelp";
import Column from "shared/components/Column/Column";

interface ILogin extends RouteComponentProps<any> {
  // this was different from the tutorial, got typescript help from: 
  // https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
}

const Login: React.FC<ILogin> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [invalidInputs, setInvalidInputs] = useState(false);

  const Auth = useContext(AuthContext);

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e: any) => {
    setPassword(e.target.value);
  }

    /* EMAIL/PASS LOGIN, must exist in database */
  const handleEmailAndPasswordLogin = async (e: any) => {
    e.preventDefault();

    try {
      const createdUser = await signUserInWithEmailAndPassword(email, password);
      if (createdUser?.user) {
        Auth?.setLoggedIn(true);

        if (createdUser.user.uid) {
          let userSettings = await getUserSettings();
          if (userSettings && userSettings?.displayName) {
            if (history) history.push('/posts');
          } else {
            if (history) history.push('/registerDetails');
          }
        }
      }
      // maybe this is where we should check if the user can go to posts or registerDetails
    } catch(e) {
      console.log(e);
      setInvalidInputs(true);
      setErrors(e.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await signUserInWithGoogle();
      if (loggedInUser?.user) Auth?.setLoggedIn(true);
      if (history) history.push('/posts');
    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    /* Adapted from Material React UI documentation - sign-in page example 
    https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
    */

    /*   
            Header 
    ----------------------
    | Left  |     Right  |    Column child 1 is a row
    | Left  |     Right  |    Each row child holds a column
    ----------------------
    |     Copyright      |    Column child 2 is copyright
    ----------------------

    */

    <Box pl={6} pr={6}>
      <Column>

        <Grid item xs={12} className="blueBorder">
          <Grid container direction="row">
            
            {/* LEFT SIDE: TITLE, HELP */ }
            {/* ROW CHILD 1 */}
            <Grid item xs={12} md={4} className="redBorder">
              <Column justify="space-between" className="credentialsLeft">
              
                {/* <Grid container direction="column" justify="space-between" > */} 
                    
                    {/* item 1 */}
                  <CredentialsLeftTitle
                    title="Returning users"
                    subtitle="Have an account? Sign in now."
                  />

                  {/* item 2 */}
                  <LoginHelp />
                  
              </Column>{/* Closes column */}
            </Grid>{/* Closes item */}


            {/* RIGHT SIDE: LOGIN FORM */ }
            {/* ROW CHILD 2  */ }
            <Grid item xs={12} md={8} className="redBorder">
              <Grid container direction="column" spacing={2} justify="center" alignItems="center">
                <form noValidate onSubmit={e => handleEmailAndPasswordLogin(e)}>

                  {/* Email address */}
                  <Grid item xs={12}>
                    <BigInput 
                        error={invalidInputs}
                        labelText="E-Mail Address"
                        name="email"
                        required={true} 
                        value={email}
                        autoFocus={false}
                        autoComplete="current-email"
                        type="email"
                        onChange={updateEmail}
                        />
                  </Grid>

                  {/* Password */ }
                  <Grid item xs={12}>
                    <BigInput 
                        error={invalidInputs}
                        labelText="Password"
                        name="password"
                        required={true} 
                        value={password}
                        autoFocus={false}
                        autoComplete="current-password"
                        type="password"
                        onChange={updatePassword}
                        />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="bigButton"
                    >
                      Sign In
                    </Button>
                  </Grid>


                  {error &&
                    <Alert severity="error">{error}</Alert>
                  }

                </form>
            </Grid>
          </Grid> {/* Closes right side */ }


        </Grid>{/* Closes row that contains left and right sides */}

        <Copyright />      
      </Grid>
      </Column>
  </Box>
  );
};

export default Login;
