import React, { useState, useEffect } from 'react';

import { roles } from '../../../enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../../services/user';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import BigInput from 'shared/components/BigInput/BigInput';
import LinkedAccountManagement from './components/LinkedAccountManagement';

import './SettingsView.css';

interface ISettingsView extends RouteComponentProps<any>{
  // empty for now 
}

const SettingsView: React.FC<ISettingsView> = ({ history }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");

  const [error, setErrors] = useState("");

  const updateDisplayName = (e: any) => {
    setDisplayName(e.target.value);
  }

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  /* UPDATE ACCOUNT SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      let updateProfileDone = await updateUserProfile(displayName, email);
      let updateSettingsDone = await updateUserSettings({role, displayName, email});

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
        setDisplayName(settings?.displayName);
        setEmail(settings?.email);
      });

    getUserProfile()
      .then((userProfile: any) => {
        setUserID(userProfile?.uid);
      })
  }, []); // fires on page load if this is empty [] 

  return (
    <Grid container className="settingsForm" spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <div>
            <Typography component="h1" variant="h4">
              Account settings
            </Typography>

            <form onSubmit={e => handleForm(e)}>

                <Grid item xs={12}>
                  <BigInput 
                    labelText="Display Name"
                    name="displayName"
                    required={true} 
                    value={displayName}
                    autoFocus={false}
                    autoComplete="none"
                    type="text"
                    onChange={updateDisplayName}/>
                </Grid>

                <Grid item xs={12}>
                  <BigInput 
                    labelText="E-mail address"
                    name="email"
                    required={true} 
                    value={email}
                    autoFocus={false}
                    autoComplete="none"
                    type="text"
                    onChange={updateEmail}/>
                </Grid>

                <Grid item xs={12}>
                <Typography component="h2" variant="h5">
                  Account type
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

              <Button type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="bigButton">
                Update settings
              </Button>
          
            </form>
          <span className="error">{error}</span>
        </div>

      </Grid>

      <Grid item xs={12} sm={6}>
        <LinkedAccountManagement role={role} />
      </Grid>

      <Grid item xs={12}>
        <Box className="todo">
        <h3>To do items:</h3>
        <ul>
          <li>Make this page look less like the login/register pages</li>
          <li>Change role should have a confirmation of some sort</li>
          <li>Fade out removed invites/deleted friends</li>
          <li>[Stretch goal] Friend profile pics?</li>
        </ul>
        <b>Debug</b>
        <p>User ID: {userID}</p>

      </Box>
    </Grid>
    </Grid>
  )
}

export default SettingsView;