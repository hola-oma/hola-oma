import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

import './Header.css';

import { useHistory } from "react-router-dom";
import { signUserOut } from "services/user";
import * as firebase from 'firebase';

interface IHeader {
  isLoggedIn: boolean;
}

const Header: React.FC<IHeader> = ({ isLoggedIn }) => {

  const Auth = useContext(AuthContext);
  let history = useHistory();

  const handleSignOut = () => {
    signUserOut().then(function() {
      
      Auth?.setLoggedIn(false);
      history.push('/');
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  return (
    <div className="headerBar">
      
      <div className="pullLeft">
        <h2>Hola Oma</h2>
      </div>
      
      <div className="pullRight">
        <ul className="nav">
          {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {isLoggedIn && <li><Link to="/settings">Settings</Link></li>}
          {isLoggedIn && <li><Link to="/addAccountLink">Add link</Link></li>}
          {isLoggedIn && <li><Link to="/posts">Posts</Link></li>}
          {isLoggedIn && <li><button onClick={handleSignOut}>Sign out</button></li>}
        </ul>
      </div>

    </div>
  );
}

export default Header;