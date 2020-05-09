import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

import './Header.css';

import { useHistory } from "react-router-dom";
import { signUserOut } from "services/user";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';


interface IHeader {
  isLoggedIn: boolean;
  settingsComplete: boolean;
}

const Header: React.FC<IHeader> = ({ isLoggedIn, settingsComplete }) => {

  const Auth = useContext(AuthContext);
  let history = useHistory();

  const goToPhotoPrototype = () => {
    history.push('/photoReplyPrototype')
  }

  const goToRegistration = () => {
    history.push('/join')
  }

  const goToSignIn = () => {
    history.push('/signIn')
  }

  const goToInbox = () => {
    history.push('/posts')
  }

  const goToSettings = () => {
    history.push('/settings')
  }

  const handleSignOut = () => {
    signUserOut().then(function() {
      
      Auth?.setLoggedIn(false);
      Auth?.setSettingsComplete(false);
      history.push('/');
    }).catch(function(error) {
      console.log(error);
    });
  }

  const joinButton = () => (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      className=""
      onClick={() => goToRegistration()}
      startIcon={<AccountCircleIcon />}
    >
      Join
    </Button>
  )

  const signInButton = () => (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      className=""
      onClick={() => goToSignIn()}
      startIcon={<AccountCircleIcon />}
      >
      Sign in
    </Button>
  )

  const photoButton = () => (
    <Button
      variant="outlined"
      color="secondary"
      size="medium"
      className=""
      onClick={() => goToPhotoPrototype()}
      startIcon={<AccountCircleIcon />}
      >Photo
    </Button>
  )

  const inboxButton = () => (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className=""
      onClick={() => goToInbox()}
      startIcon={<MailIcon />}
    >
      Inbox
    </Button>
  )

  const settingsButton = () => (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className=""
      onClick={() => goToSettings()}
      startIcon={<SettingsIcon />}
    >
      Settings
    </Button>
  )
  
  return (
    <AppBar position="static" className="headerBar">
      <Toolbar>
        <Typography className="pullLeft appTitle">
          {settingsComplete && 
            <Link to="/posts">Hola, Oma!</Link>
          }

          {!settingsComplete && 
            <Link to="/registerDetails">Hola, Oma!</Link>
          }

        </Typography>
        
        <div className="nav">
          {!isLoggedIn && 
            <ul>
              <li>
                {joinButton()}
                </li>

              <li>
                {signInButton()}
              </li>
            </ul>
          }

          {(isLoggedIn && settingsComplete) &&
            <ul>
              <li>
                {photoButton()}
              </li>

              <li>
                {inboxButton()}
              </li>

              <li>
                {settingsButton()}
              </li>
              
              <li><button onClick={handleSignOut}>Sign out</button></li>
            </ul>
          }

        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Header;