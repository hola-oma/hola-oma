import React, { useState, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../../services/user';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import BigInput from 'shared/components/BigInput/BigInput';
import LinkedAccountManagement from './components/LinkedAccountManagement';

import './SettingsView.css';
import ChangeAccountTypeAlert from './components/ChangeAccountTypeAlert';

interface ISettingsView extends RouteComponentProps<any>{
  setIsLoading: (loading: boolean) => void;
}

const SettingsView: React.FC<ISettingsView> = ({ history, setIsLoading }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [changeAccountTypeAlertOpen, setChangeAccountTypeAlertOpen] = useState<boolean>(false);

  const [error, setErrors] = useState("");

  const updateDisplayName = (e: any) => {
    setDisplayName(e.target.value);
  }

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const openRoleModal = () => {
    setChangeAccountTypeAlertOpen(true);
  }

  const handleChangeAccountTypeAlertClose = () => {
    setChangeAccountTypeAlertOpen(false);
  }

  const changeRole = (newRole: string) => {
    setRole(newRole);
    setChangeAccountTypeAlertOpen(false);
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
    let isMounted = true;
    setIsLoading(true);

    getUserSettings()
      .then((settings:any) => {
        if (isMounted) {
          setRole(settings.role);
          setDisplayName(settings?.displayName);
          setEmail(settings?.email);
          
          getUserProfile()
          .then((userProfile: any) => {
            setUserID(userProfile?.uid);

            setIsLoading(false);
          });
      }

    });

    return () => { isMounted = false; }
  }, [setIsLoading]); // fires on page load if this is empty [] 

  return (
    <>
    <Grid container className="settingsForm" spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={5}>
          <div>
            <Typography component="h1" variant="h4">
              Account settings
            </Typography>

            <form onSubmit={e => handleForm(e)}>

                <Grid item xs={12}>
                  <BigInput 
                    error={false}
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
                    error={false} 
                    labelText="E-mail address"
                    name="email"
                    required={true} 
                    value={email}
                    autoFocus={false}
                    autoComplete="none"
                    type="email"
                    onChange={updateEmail}/>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Account type: {role.toString()} 
                    <Button 
                      variant="outlined" 
                      size="small" 
                      color="primary" 
                      className="pullRight" 
                      onClick={() => openRoleModal()}>Change</Button>
                    </Typography>
                </Grid>

                
              <Button type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className="bigButton">
                Save settings
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
          <li>Fade out removed invites/deleted friends</li>
          <li>[Stretch goal] Friend profile pics?</li>
        </ul>
        <b>Debug</b>
        <p>User ID: {userID}</p>

      </Box>
    </Grid>
    </Grid>

    <ChangeAccountTypeAlert 
      isOpen={changeAccountTypeAlertOpen} 
      role={role} 
      changeRole={changeRole}
      onClose={handleChangeAccountTypeAlertClose} 
    />

  </>
  )
}

export default SettingsView;
