import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import 'firebase/auth';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object 
import { signUserInWithEmailAndPassword, signUserInWithGoogle, getUserSettings } from "services/user";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Copyright from "shared/components/Copyright";
import BigInput from "shared/components/BigInput/BigInput";
import Alert from "@material-ui/lab/Alert";

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

    <Grid container className="credentialsForm" spacing={2} justify="center">
      <Grid item xs={10} md={8}>
      <div>
        <Avatar className="formAvatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Log in to existing account
        </Typography>

        {/* Begin form */}
        <form noValidate onSubmit={e => handleEmailAndPasswordLogin(e)}>

          <Grid container spacing={2} justify="center">

            {/* Email address */}
            <Grid item xs={12} sm={8}>
              <BigInput 
                  error={invalidInputs}
                  labelText="E-Mail Address"
                  name="email"
                  required={true} 
                  value={email}
                  autoFocus={true}
                  autoComplete="current-email"
                  type="email"
                  onChange={updateEmail}
                  />
            </Grid>

            {/* Password */ }
            <Grid item xs={12} sm={8}>
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

            <Grid item xs={12} sm={8}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="bigButton"
              >
                Log In
              </Button>
            </Grid>


          {error &&
            <Alert severity="error">{error}</Alert>
          }

          {/* Account maintenance options */}
          <Grid item container xs={12} sm={8} justify="center" className="padBottom">
            <Grid item xs={5}>
              <Link href="/resetPassword" className="bigLink">
                Forgot password?
              </Link>
            </Grid>

            <Grid item xs={5}>
              <Link href="/register" className="bigLink">
                No account? Sign up!
              </Link>
            </Grid>
          </Grid>

          {/* Google sign in */}
          <Grid item xs={12} sm={8}>
            <Button 
              onClick={handleGoogleLogin} 
              className="googleBtn" 
              type="button"
              variant="contained"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
              Log in with Google
            </Button> 
          </Grid>
      
        </Grid>
        
      </form>

      </div>
    </Grid>
      
    <Grid item xs={12}>
      <Box mt={6}>
        <Copyright />      
      </Box>
    </Grid>
  </Grid>
  );
};

export default Login;
