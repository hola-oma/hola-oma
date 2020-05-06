import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../App";

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { roles } from '../../enums/enums';
import { getUserProfile, createUserSettings, updateUserProfile } from "services/user";
import BigInput from "shared/components/BigInput/BigInput";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormError from "shared/components/FormError/FormError";
import CredentialsWrapper from "shared/components/CredentialsWrapper";
import Child from "shared/components/Child/Child";
import FormSubmitButton from "shared/components/FormSubmitButton";
import Row from "shared/components/Row/Row";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";

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
    <CredentialsWrapper>
      <Row justify="center">
      <Child xs={12} sm={8} md={6} lg={4}>
        <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Display my name as" subtitle="" />
        
        <form onSubmit={e => handleForm(e)} noValidate>
            
          {/* Display name */}
          <Child xs={12}>
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
          </Child>

          <Child xs={12}>
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
          </Child>

          <FormSubmitButton buttonText="Done"/>
          <FormError error={error}/>

          </form>
        </Child>
      </Row>
    </CredentialsWrapper>
  );
};

export default RegisterDetails;