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
}

const Header: React.FC<IHeader> = ({ isLoggedIn }) => {


  const Auth = useContext(AuthContext);
  let history = useHistory();

  const goToPhotoPrototype = () => {
    history.push('/photoReplyPrototype')
  }

  const goToRegistration = () => {
    history.push('/register')
  }

  const goToLogin = () => {
    history.push('/login')
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
      history.push('/');
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  return (
    <AppBar position="static" className="headerBar">
      <Toolbar>

        <Typography className="pullLeft appTitle">
          <Link to="/posts">Hola, Oma!</Link>
        </Typography>
        
        <div className="nav">
          {!isLoggedIn && 
            <ul>
              <li>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className=""
                  onClick={() => goToRegistration()}
                  startIcon={<AccountCircleIcon />}
                >
                  Register
                </Button>
                </li>

              <li><Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className=""
                  onClick={() => goToLogin()}
                  startIcon={<AccountCircleIcon />}
                >
                  Login
                </Button></li>
            </ul>
          }

          {isLoggedIn && 
            <ul>
              {/* Remove later */}
              <li>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className=""
                  onClick={() => goToPhotoPrototype()}
                  startIcon={<AccountCircleIcon />}
                >Photo prototype
                </Button>
              </li>

              <li>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className=""
                  onClick={() => goToInbox()}
                  startIcon={<MailIcon />}
                >
                  Inbox
                </Button>
              </li>

              <li>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className=""
                  onClick={() => goToSettings()}
                  startIcon={<SettingsIcon />}
                >
                  Settings
                </Button>
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