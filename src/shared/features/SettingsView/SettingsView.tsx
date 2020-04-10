import React, { useState, useEffect } from 'react';

import { roles } from '../../../enums/enums';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from '../../../services/user';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { getLinkedAccounts } from 'services/accountLink';
import { AccountLink } from 'shared/models/accountLink.model';

import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';

import BigInput from 'shared/components/BigInput/BigInput';
import ManageAccountLinkAlert from './components/ManageAccountLinkAlert';

interface ISettingsView extends RouteComponentProps<any>{
  // empty for now 
}

const SettingsView: React.FC<ISettingsView> = ({ history }) => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");

  const [linkedAccounts, setLinkedAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 
  const [selectedFriend, setSelectedFriend] = useState<AccountLink>();

  const [error, setErrors] = useState("");

  const [manageAccountLinkAlertOpen, setManageAccountLinkAlertOpen] = useState<boolean>(false);

  const muteFriend = (friend: AccountLink) => {
    console.log("Stub: Muting friend");
  }

  const unfriendFriend = (friend: AccountLink) => {
    console.log("Stub: Unfriending friend");
  }

  const handleManageAccountLinkAlertClose = () => {
    setManageAccountLinkAlertOpen(false);
  }

  const manageAccountLink = (friend: AccountLink) => {
    console.log("Opening alert to manage this friend: ", friend);
    setSelectedFriend(friend);
    setManageAccountLinkAlertOpen(true);
  }

  const generateLinkedAccountsList = (items: AccountLink[]) => {
    return items.map((friend, index) => {
      return (
        <ListItem key={index}>

          {/* Icon to the left */}
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>

          {/* Text */}
          <ListItemText
            primary={friend.id}
            secondary={friend.verified ? 'Verified' : 'Pending'}
          />
          {/* Button to the right */}
          <ListItemSecondaryAction>
            <IconButton color="primary" onClick={() => manageAccountLink(friend)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
      );
    })
  };

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
        setDisplayName(userProfile?.displayName);
        setEmail(userProfile?.email);
        setUserID(userProfile?.uid);
      })
  }, []); // fires on page load if this is empty [] 

  // On page load, this calls getLinkedAccounts from the link service
  useEffect(() => {
    getLinkedAccounts()
      .then((links:any) => {
        let accounts: AccountLink[] = [];
        links.forEach((link:AccountLink) => {
          accounts.push(link);
        });
        console.log(accounts);
        setLinkedAccounts(accounts);
    })
  }, []);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left'
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
    }
  }));

  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Account settings
        </Typography>

        <p>Update your name, email address, and other settings here.</p>

        <form onSubmit={e => handleForm(e)}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
              <BigInput 
                labelText="Display Name"
                name="displayName"
                required={true} 
                value={displayName}
                autoFocus={true}
                autoComplete="none"
                type="text"
                onChange={updateDisplayName}/>
            </Grid>

            <Grid item xs={12}>
              <BigInput 
                labelText="E-mail address"
                name="email"
                required={true} 
                value={displayName}
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

          </Grid>

          <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Update settings
          </Button>
      
        </form>
        <span className="error">{error}</span>
      </div>

      {/* One or more linked accounts exists, display their IDs here */}
      {linkedAccounts.length > 0 && 
        <Box className="devBox">
          <h3>Getting updates from:</h3>
          <div>
            <List>
              {generateLinkedAccountsList(linkedAccounts)}
            </List>
          </div>
        </Box>
      }
      
      {/* Ensure 'selectedFriend' is set before attempting to render this component */}
      {selectedFriend && 
        <ManageAccountLinkAlert 
          isOpen={manageAccountLinkAlertOpen} 
          friend={selectedFriend} 
          muteFriend={() => muteFriend(selectedFriend)}
          unfriendFriend={() => unfriendFriend(selectedFriend)}
          onClose={handleManageAccountLinkAlertClose} 
        />
      }

      <Box className="todo">
      <h3>To do items:</h3>
      <ul>
        <li>This page looks too much like the log in/register page, I always think I accidentally logged out when I visit</li>
        <li>Make role buttons BIG BUTTONS</li>
        <li>Display a table of linked accounts, with the option to remove individual links and a confirmation modal</li>
      </ul>
      <b>Debug</b>
      <p>User ID: {userID}</p>

    </Box>

    </Container>
  )
}

export default SettingsView;