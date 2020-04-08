import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../services/user';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { getLinkedAccounts } from 'services/accountLink';

interface ISettingsView extends RouteComponentProps<any>{
  // empty for now 
}

const SettingsView: React.FC<ISettingsView> = ({ history }) => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");

  const [linkedAccounts, setLinkedAccounts] = useState();

  const [error, setErrors] = useState("");

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      let updateProfileDone = await updateUserProfile(displayName, email);
      let updateSettingsDone = await updateUserSettings({role});

      if (updateProfileDone && updateSettingsDone) {
        if (history) history.push('/posts');
      }
    } catch(e) {
      setErrors(e.message);
    }
  }

  /* GET USER's PROFILE AND SETTINGS */
  useEffect(() => {
    getUserSettings()
      .then((settings:any) => {
        setRole(settings.role);
      });

    getUserProfile()
      .then((userProfile: any) => {
        setDisplayName(userProfile.displayName);
        setEmail(userProfile.email);
        setUserID(userProfile.uid);
      })
  }, []); // fires on page load if this is empty [] 

  useEffect(() => {
    getLinkedAccounts()
      .then((links:any) => {
      setLinkedAccounts(links);
    })
  }, []);

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account settings
        </Typography>

        <p>Update your name, email address, and other settings here.</p>

        <form onSubmit={e => handleForm(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="dname"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display name"
                autoFocus
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email address"
                value={email? email: ''}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
            <Typography component="h2" variant="h5">
              Role [be careful changing this!]
            </Typography>

              <label>
              <input
                type="radio"
                name="accountType"
                id="receiver"
                value="receiver"
                checked={role === roles.receiver}
                onChange={e => setRole(roles.receiver)}
                />
                <b>Receive</b> posts
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  id="poster"
                  value="poster"
                  checked={role === roles.poster}
                  onChange={e => setRole(roles.poster)}
                  />
                <b>Make</b> posts
              </label>
            </Grid>

          </Grid>

          <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Update settings
          </Button>
      
        </form>
      </div>

      <Box className="todo">
      <h3>To do items:</h3>
      <ul>
        <li>This page looks too much like the log in/register page, I always think I accidentally logged out when I visit</li>
        <li>Make role buttons BIG BUTTONS</li>
        <li>Display a table of linked accounts, with the option to remove individual links and a confirmation modal</li>
      </ul>
      <b>Debug</b>
      <p>User ID: {userID}</p>
      <p>Linked accounts, by ID: {linkedAccounts}</p>

    </Box>

    </Container>
  )
}

export default SettingsView;