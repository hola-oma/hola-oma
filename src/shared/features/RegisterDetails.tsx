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
import Child from "shared/components/Child/Child";
import Row from "shared/components/Row/Row";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";
import CredentialsForm from "shared/components/CredentialsForm/CredentialsForm";
import ViewWrapper from "shared/components/ViewWrapper";

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

  const updateDisplayName = (e: any) => {
    setDisplayName(e.target.value)
  }

  const updateDisplayNameInput = () => (
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
  )

  const roleRadioInputs = () => (
    <>
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
    </>
  )

  /* ADD USER ROLE TYPE AND DISPLAY NAME TO USER SETTINGS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    if (displayName === "") {
      setErrors("Please enter a name.");
      setInvalidName(true);
    } else if (displayName.length > 34) {
      // 34 character test name with spaces: Priscilla Jacqueline Flarblesworth
      // 34 character word with no spaces: Supercalifragilisticexpialidocious
      setErrors("Please enter a shorter name.");
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

  return (
    <ViewWrapper showCopyright={true}>
      <Row justify="center">
        <Child xs={12} sm={8} md={6} lg={6}>
          <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Display my name as" subtitle="" />
          
          <CredentialsForm onSubmit={handleForm} submitText="Done" error={error}>
            
            <Child xs={12}>
              {updateDisplayNameInput()}
            </Child>

            <Child xs={12}>
              {roleRadioInputs()}
            </Child>

          </CredentialsForm>
        </Child>
      </Row>
    </ViewWrapper>
  );
};

export default RegisterDetails;