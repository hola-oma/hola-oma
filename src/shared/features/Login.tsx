import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import 'firebase/auth';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object 
import { signUserInWithEmailAndPassword, getUserSettings } from "services/user";

import BigInput from "shared/components/BigInput/BigInput";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";
import LoginHelp from "shared/components/LoginHelp";
import Column from "shared/components/Column/Column";
import Row from "shared/components/Row/Row";
import Child from "shared/components/Child/Child";
import CredentialsWrapper from "shared/components/CredentialsWrapper";
import FormSubmitButton from "shared/components/FormSubmitButton";
import FormError from "shared/components/FormError/FormError";

interface ILogin extends RouteComponentProps<any> {
  // this was different from the tutorial, got typescript help from: 
  // https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react
}

const Login: React.FC<ILogin> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [invalidInputs, setInvalidInputs] = useState(false);

  const Auth = useContext(AuthContext);

  const updateEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e: any) => {
    setPassword(e.target.value);
  }

  /* EMAIL/PASS LOGIN, must exist in database */
  const handleEmailAndPasswordLogin = async (e: any) => {
    e.preventDefault();

    try {
      const createdUser = await signUserInWithEmailAndPassword(email, password);
      if (createdUser?.user) {
        Auth?.setLoggedIn(true);

        if (createdUser.user.uid) {
          let userSettings = await getUserSettings();
          if (userSettings && userSettings?.displayName) {
            if (history) history.push('/posts');
          } else {
            if (history) history.push('/registerDetails');
          }
        }
      }
      // maybe this is where we should check if the user can go to posts or registerDetails
    } catch (e) {
      console.log(e);
      setInvalidInputs(true);
      setErrors(e.message);
    }
  };

  return (
    <CredentialsWrapper>

      {/* Row contains side-by-side form elements */}
      <Row justify="space-between">

        {/* LEFT CHILD: TITLE, HELP */}
        <Child xs={12} md={4}>
          <Column justify="space-between" className="credentialsLeft">
            <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Returning users" subtitle="Have an account? Sign in now." />
            <LoginHelp />
          </Column>
        </Child>

        {/* RIGHT CHILD: LOGIN FORM */}
        <Child xs={12} md={7}>
          <Column justify="center" alignItems="center">
            <form noValidate onSubmit={e => handleEmailAndPasswordLogin(e)}>

              {/* Email address */}
              <Child item xs={12}>
                <BigInput
                  error={invalidInputs}
                  labelText="E-Mail Address"
                  name="email"
                  required={true}
                  value={email}
                  autoFocus={false}
                  autoComplete="current-email"
                  type="email"
                  onChange={updateEmail}
                />
              </Child>

              {/* Password */}
              <Child item xs={12}>
                <BigInput
                  error={invalidInputs}
                  labelText="Password"
                  name="password"
                  required={true}
                  value={password}
                  autoFocus={false}
                  autoComplete="current-password"
                  type="password"
                  onChange={updatePassword}
                />
              </Child>

              <FormSubmitButton buttonText="Sign in"/>

              <FormError error={error}/>

            </form>
          </Column>
        </Child>
      </Row>
    </CredentialsWrapper>
  );
};

export default Login;
