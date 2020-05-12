import React, { useState, useContext } from "react";

import { AuthContext } from "../../../App";

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { createNewUserWithEmailAndPassword } from "services/user";
import BigInput from "shared/components/BigInput/BigInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CredentialsWrapper from "shared/components/CredentialsWrapper";
import Row from "shared/components/Row/Row";
import Child from "shared/components/Child/Child";
import Column from "shared/components/Column/Column";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";

import CredentialsForm from "shared/components/CredentialsForm/CredentialsForm";

interface IJoin {
  history?: any;
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Join: React.FC<IJoin> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const Auth = useContext(AuthContext);

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const emailAddressInput = () => (
    <BigInput
      error={invalidEmail}
      labelText="E-Mail Address"
      name="email"
      required={true} 
      value={email}
      autoFocus={false}
      autoComplete="off"
      type="email"
      onChange={updateEmail}/>
  )

  const passwordInput = () => (
    <BigInput 
      error={invalidPassword}
      labelText="Password"
      name="password"
      required={true} 
      value={password}
      autoFocus={false}
      autoComplete="off"
      type="password"
      onChange={updatePassword}/>
  )

  /* EMAIL & PASSWORD ACCOUNT CREATION */
  const handleForm = async (e: any) => {
    e.preventDefault();

    if (email === "") {
      setInvalidEmail(true);
      setErrors("Please enter an email address.");
    } else if (password === "") {
      setInvalidPassword(true);
      setErrors("Please enter a password.");
    } else {
      try {
        const userCreated = await createNewUserWithEmailAndPassword(email, password);

        if (userCreated) {
          Auth?.setLoggedIn(true);
          if (history) history.push('/registerDetails');
        }
      } catch(e) {
        setErrors(e.message);
        setInvalidEmail(true);
        setInvalidPassword(true);
      }
    }
  }

  return (
    <CredentialsWrapper>

      {/* Row contains side-by-side form elements */}
      <Row justify="space-around">

        {/* LEFT CHILD: TITLE, HELP */}
        <Child xs={12} sm={8} md={4}>
          <Column justify="space-between">
            <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Create an account" subtitle="Connect with friends and family anywhere." />
          </Column>
        </Child>

        {/* RIGHT CHILD: REGISTRATION FORM */}
        <Child xs={12} sm={8} md={5}>
          <Column justify="center" alignItems="center">

            <CredentialsForm onSubmit={handleForm} submitText="Join now for free" error={error}>
              <Child xs={12}>
                {emailAddressInput()}
              </Child>

              <Child xs={12}>
                {passwordInput()}
              </Child>

            </CredentialsForm>

          </Column>  
        </Child>
      </Row>
    </CredentialsWrapper>
  );
};

export default Join;