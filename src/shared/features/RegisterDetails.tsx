import React, { useState, useContext, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Copyright from 'shared/components/Copyright';

import { AuthContext } from "../../App";

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { roles } from '../../enums/enums';
import { getUserProfile, createUserSettings, updateUserProfile } from "services/user";
import BigInput from "shared/components/BigInput/BigInput";
import { Avatar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface IRegisterDetails extends RouteComponentProps<any> {
    setIsLoading: (loading: boolean) => void
}

/* This page is where we set the display name and account type */
/* Separated from main Register page to make the Register page less overwhelming */

const RegisterDetails: React.FC<IRegisterDetails> = ({ history, setIsLoading }) => {
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles.receiver); 

  const [error, setErrors] = useState("");
  const [invalidName, setInvalidName] = useState(false);

  const Auth = useContext(AuthContext);

  /* useEffect is a built-in React hook that fires when the page
  loads. When this page loads, it gets the signed in user from the db */
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getUserProfile().then((doc:any) => {
      if (isMounted) {
        // Users who signed up using Google already have a display name, so 
        // retrieve and display it if it's there 
        setDisplayName(doc?.displayName ? doc.displayName : ''); 
        setUserID(doc?.uid);
        setEmail(doc?.email ? doc.email : '');

        setIsLoading(false);
      }
    });

    return () => { isMounted = false; }
  }, [setIsLoading]); // fires on page load if this is empty [] 


  /* ADD USER ROLE TYPE AND DISPLAY NAME TO USER SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    if (displayName === "") {
      setErrors("Please enter a name");
      setInvalidName(true);
    } else {
      try {
        const userCreated = await createUserSettings(userID, role, displayName, email);
        const profileUpdated = await updateUserProfile(displayName, email);
        
        if (userCreated && profileUpdated) {
          Auth?.setLoggedIn(true); 
          Auth?.setSettingsComplete(true);
          if (history) history.push('/posts');
        }
      } catch(e) {
        setErrors(e.message);
      }
    }
  }

  const updateDisplayName = (e: any) => {
    setDisplayName(e.target.value)
  }

  return (
    <Grid container className="credentialsForm" spacing={2} justify="center">
      <Grid item xs={10} md={8}>
        <div>
          <Avatar className="formAvatar">
            <AccountCircleIcon />
          </Avatar>

        <Typography component="h1" variant="h4">
          Display my name as
        </Typography>

        <form onSubmit={e => handleForm(e)} className="" noValidate>

          <Grid container spacing={2} justify="center">
            
            {/* Display name */}
            <Grid item xs={12} sm={8}>
              <BigInput 
                error={invalidName}
                labelText=""
                name="displayName"
                required={true} 
                value={displayName}
                autoFocus={true}
                autoComplete="fname"
                type="text"
                onChange={updateDisplayName}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
            <label>
              <input
                type="radio"
                name="accountType"
                id="receiver"
                value="receiver"
                checked={role === roles.receiver}
                onChange={e => setRole(roles.receiver)}
                />
                I want to <b>receive</b> posts
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  id="poster"
                  value="poster"
                  onChange={e => setRole(roles.poster)}
                  />
                I want to <b>make</b> posts
              </label>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className="bigButton"
              >
                Done
              </Button>
            </Grid>

            <Grid item xs={12} sm={8}>
              {error &&
                <Alert className="error" severity="error">{error}</Alert>
              }
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

export default RegisterDetails;