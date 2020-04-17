import React, { useState, useContext, useEffect } from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from 'shared/components/Copyright';

import { AuthContext } from "../../App";

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { roles } from '../../enums/enums';
import { getUserProfile, createUserSettings, updateUserProfile } from "services/user";

interface IRegisterDetails extends RouteComponentProps<any> {
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

/* This page is where we set the display name and account type */
/* Separated from main Register page to make the Register page less overwhelming */

const RegisterDetails: React.FC<IRegisterDetails> = ({ history }) => {
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles.receiver); 

  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);

  /* useEffect is a built-in React hook that fires when the page
  loads. When this page loads, it gets the signed in user from the db */
  useEffect(() => {
    let mounted = true;
    getUserProfile().then((doc:any) => {
      if (mounted) {
        // Users who signed up using Google already have a display name, so 
        // retrieve and display it if it's there 
        setDisplayName(doc?.displayName ? doc.displayName : ''); 
        setUserID(doc?.uid);
        setEmail(doc?.email ? doc.email : '');
      }
    });

    return () => { mounted = false; }
  }, []); // fires on page load if this is empty [] 


  /* ADD USER ROLE TYPE AND DISPLAY NAME TO USER SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      const userCreated = await createUserSettings(userID, role, displayName, email);
      const profileUpdated = await updateUserProfile(displayName, email);
      
      if (userCreated && profileUpdated) {
        Auth?.setLoggedIn(true); 
        if (history) history.push('/posts');
      }
    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    <Grid container>
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h4">
          Display my name as
        </Typography>

        <form onSubmit={e => handleForm(e)} className="" noValidate>

        <Grid container spacing={2}>
            {/* Display name */}
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Your Name"
                autoFocus
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
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
          </Grid>

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


        </form>
        <span className="error">{error}</span>
      </div>
      <Box mt={8}>
        <Copyright />      
      </Box>
    </Container>
    </Grid>
  );
};

export default RegisterDetails;