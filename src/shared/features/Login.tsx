import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import 'firebase/auth';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object 
import { signUserInWithEmailAndPassword, signUserInWithGoogle } from "services/user";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "shared/components/Copyright";
import BigInput from "shared/components/BigInput/BigInput";

interface ILogin extends RouteComponentProps<any> {
  // this was different from the tutorial, got typescript help from: 
  // https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
}

const Login: React.FC<ILogin> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

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
      if (createdUser?.user) Auth?.setLoggedIn(true);
      if (history) history.push('/posts');
    } catch(e) {
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

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    /* Adapted from Material React UI documentation - sign-in page example 
    https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
    */

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Begin form */}
        <form className={classes.form} noValidate onSubmit={e => handleEmailAndPasswordLogin(e)}>

          <Grid container spacing={2}>

            {/* Email address */}
            <Grid item xs={12}>
              <BigInput 
                  labelText="E-mail Address"
                  name="email"
                  required={true} 
                  value={email}
                  autoFocus={true}
                  autoComplete="current-email"
                  type="text"
                  onChange={updateEmail}/>
            </Grid>

            {/* Password */ }
            <Grid item xs={12}>
              <BigInput 
                  labelText="Password"
                  name="password"
                  required={true} 
                  value={password}
                  autoFocus={false}
                  autoComplete="current-password"
                  type="password"
                  onChange={updatePassword}/>
            </Grid>
          </Grid>

          {/* Sign in button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>

          {/* Account maintenance options */}
          <Grid container>

            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {/* 
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                  {"Other sign-in options"}
              </Link>
            </Grid>
          </Grid>
          */} 

        </form>

        {/* 
        <hr />
        <h2>Other sign-in methods</h2>
        <button className="googleBtn" type="button" onClick={ () => handleGoogleLogin() }>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Log in With Google
        </button>

        */}


      <span className="error">{error}</span>
    </div>
    <Box mt={8}>
      <Copyright />      
    </Box>
  </Container>
  );
};

export default Login;