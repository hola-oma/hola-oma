import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

import './Header.css';

import { useHistory } from "react-router-dom";
import { signUserOut } from "services/user";
import { AppBar, Toolbar, Typography, Button, Hidden, Drawer, List, ListItemIcon, ListItem, Divider, ListItemText } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import Child from "shared/components/Child/Child";
import Column from "shared/components/Column/Column";

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MenuIcon from '@material-ui/icons/Menu';


interface IHeader {
  isLoggedIn: boolean;
  settingsComplete: boolean;
}

const Header: React.FC<IHeader> = ({ isLoggedIn, settingsComplete }) => {

  const Auth = useContext(AuthContext);
  let history = useHistory();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const goToPhotoPrototype = () => {
    setDrawerOpen(false);
    history.push('/photoReplyPrototype');
  }

  const goToRegistration = () => {
    setDrawerOpen(false);
    history.push('/join');
  }

  const goToSignIn = () => {
    setDrawerOpen(false);
    history.push('/signIn');
  }

  const goToInbox = () => {
    setDrawerOpen(false);
    history.push('/posts');
  }

  const goToSettings = () => {
    setDrawerOpen(false);
    history.push('/settings');
  }

  const toggleDrawer = (open: boolean) =>  (e: React.KeyboardEvent | React.MouseEvent,
    ) => {

      if (e.type === 'keydown' &&
        ((e as React.KeyboardEvent).key === 'Tab' ||
          (e as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

    setDrawerOpen(open);
  };

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
      startIcon={<CameraAltIcon />}
      >
      Proto
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

  const signOutButton = () => (
    <button 
      onClick={handleSignOut}
      >
      Sign out
    </button>
  )

  const menuButton = () => (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className=""
      onClick={toggleDrawer(true)}
      startIcon={<MenuIcon />}
    >
      Menu
    </Button>
  )

  const drawerContents = () => (
    <List>
      <Divider />

      <ListItem>
        {photoButton()}
      </ListItem>

      <ListItem>
        {inboxButton()}
      </ListItem>

      <ListItem>
        {settingsButton()}
      </ListItem>

      <Divider />

      <ListItem>
        {signOutButton()}
      </ListItem>


    </List>
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
            <>
              {/* big buttons for desktop and wide tablets */}
              <Hidden xsDown>
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
                
                <li>
                  {signOutButton()}
                </li>
              </ul>
              </Hidden>

              {/* menu drawer for phones */}
              <Hidden smUp>
                <Column alignItems="flex-end">
                  <Child>
                    {menuButton()}
                  </Child>
                </Column>
              </Hidden>
            </>
          }

        <Drawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerContents()}
        </Drawer>
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Header;