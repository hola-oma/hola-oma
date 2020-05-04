import React, { useState, useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Copyright from 'shared/components/Copyright';

import { AuthContext } from "../../../App";

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { createNewUserWithEmailAndPassword, createNewUserWithGoogleCredentials } from "services/user";
import BigInput from "shared/components/BigInput/BigInput";
import Alert from "@material-ui/lab/Alert";

interface IRegister {
  history?: any;
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Register: React.FC<IRegister> = ({ history }) => {
  // const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const Auth = useContext(AuthContext);

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e: any) => {
    setPassword(e.target.value);
  }

  /* EMAIL & PASSWORD ACCOUNT CREATION */
  const handleForm = async (e: any) => {
    e.preventDefault();

    if (email === "") {
      setInvalidEmail(true);
      setErrors("Please enter an email address.");
    } else if (password === "") {
      setInvalidPassword(true);
      setErrors("Please enter a password.");
    } else {
      try {
        const userCreated = await createNewUserWithEmailAndPassword(email, password);

        if (userCreated) {
          Auth?.setLoggedIn(true);
          if (history) history.push('/registerDetails');
        }
      } catch(e) {
        setErrors(e.message);
        setInvalidEmail(true);
        setInvalidPassword(true);
      }
    }
  }

  /* JOIN USING GOOGLE ACCOUNT */
  const handleGoogleJoin = async () => {
    try {
      const userCreated = await createNewUserWithGoogleCredentials();
      if (userCreated) {
        console.log("Created user, going to registerDetails: ", userCreated);
        Auth?.setLoggedIn(true);
        if (history) history.push('/registerDetails');
      } 
    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    <Grid container className="credentialsForm" spacing={2} justify="center">
      <Grid item xs={10} md={8} className="redBorder">
        <div>
          <Typography component="h1" variant="h4">
            Create an account
          </Typography>
          <p>Connect with friends and family anywhere.</p>

          <form onSubmit={e => handleForm(e)} noValidate>

          <Grid container spacing={2} justify="center">

              {/* Email address */}
              <Grid item xs={12} sm={8}>
                <BigInput
                  error={invalidEmail}
                  labelText="E-Mail Address"
                  name="email"
                  required={true} 
                  value={email}
                  autoFocus={false}
                  autoComplete="off"
                  type="email"
                  onChange={updateEmail}/>

              </Grid>

              {/* Password */ }
              <Grid item xs={12} sm={8}>
              <BigInput 
                error={invalidPassword}
                labelText="Password"
                name="password"
                required={true} 
                value={password}
                autoFocus={false}
                autoComplete="off"
                type="password"
                onChange={updatePassword}/>
              </Grid>

            <Grid item xs={12} sm={8}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className="bigButton"
                id="signUpButton"
              >
                Join now for free
              </Button>
            </Grid>

          {error &&
            <Alert severity="error" className="errorAlert">{error}</Alert>
          }

            </Grid>
          </form>

        </div>
      </Grid>
      <Copyright />      

    </Grid>
  );
};

export default Register;