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
import FormSubmitButton from "shared/components/FormSubmitButton";
import FormError from "shared/components/FormError/FormError";

interface IRegister {
  history?: any;
  // empty for now 
  // got help here: https://stackoverflow.com/questions/49342390/typescript-how-to-add-type-check-for-history-object-in-react 
}

const Register: React.FC<IRegister> = ({ history }) => {
  // const [displayName, setDisplayName] = useState("");
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
      <Row justify="space-between">

        {/* LEFT CHILD: TITLE, HELP */}
        <Child xs={12} md={4}>
          <Column justify="space-between" className="credentialsLeft">
            <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Create an account" subtitle="Connect with friends and family anywhere." />
          </Column>
        </Child>

        {/* RIGHT CHILD: REGISTRATION FORM */}
        <Child xs={12} md={7}>
          <Column justify="center" alignItems="center">

            <form onSubmit={e => handleForm(e)} noValidate>

              {/* Email address */}
              <Child xs={12}>
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
              </Child>

              {/* Password */ }
              <Child xs={12}>
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
              </Child>

              <FormSubmitButton buttonText="Join for free"/>

              <FormError error={error}/>

            </form>

          </Column>  
        </Child>
      </Row>
    </CredentialsWrapper>
  );
};

export default Register;