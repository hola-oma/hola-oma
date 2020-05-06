import React, { useState, useEffect } from "react";
import * as QueryString from "query-string"

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormError from 'shared/components/FormError/FormError';

import HelpIcon from '@material-ui/icons/Help';

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { useHistory, Link } from "react-router-dom";
import { RouteComponentProps, useLocation } from 'react-router-dom'; // give us 'history' object
import { Avatar } from "@material-ui/core";

import { verifyActionCode, resetPassword } from 'services/user';
import Alert from "@material-ui/lab/Alert";
import BigInput from "shared/components/BigInput/BigInput";
import CredentialsWrapper from "shared/components/CredentialsWrapper";
import Child from "shared/components/Child/Child";
import CredentialsForm from "shared/components/CredentialsForm/CredentialsForm";
import Row from "shared/components/Row/Row";
import Column from "shared/components/Column/Column";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";

interface MatchParams {
  mode: string;
}

interface IHandleReset extends RouteComponentProps<MatchParams> {
  props: RouteComponentProps;
}

const HandleReset: React.FC<IHandleReset> = () => {

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");

  const [error, setErrors] = useState("");

  const location = useLocation();

  const params = QueryString.parse(location.search);

  const updatePassword = (e: any) => {
    setNewPassword(e.target.value);
  }

  const emailInvalid = () => (
    <Column justify="center" alignItems="center">
      <Child xs={12}>
        <FormError error={error} />
      </Child>
      <Child xs={12}>
        <Link to="/resetPassword">Try again</Link>
      </Child>
    </Column>
  )

  const passwordInput = () => (
    <BigInput
      error={false} 
      labelText="New password"
      name="password"
      required={true}
      value={newPassword}
      autoFocus={true}
      autoComplete="off"
      type="password"
      onChange={updatePassword}/>
  )

  const passwordForm = () => (
    <>
      <CredentialsLeftTitle icon={<HelpIcon />} title="Enter a new password" subtitle={"for " + email}/>
      <br/>
      <CredentialsForm onSubmit={handleForm} submitText="Save" error={error}>
        {passwordInput()}
      </CredentialsForm>
    </>
  )

  const successMessage = () => (
    <Row justify="center" alignItems="flex-start">
      <Child container xs={12} justify="center">
        <Typography component="h1" variant="h4">
          Success!
        </Typography>
      </Child>

      <Child container xs={12} justify="center">
        <Typography align="center">Password for <b>{email}</b> has been reset.</Typography>
      </Child>

      <Child container xs={12} justify="center">
        <Button className="bigButton" variant="contained" color="primary" onClick={() => {goToLogin()}}>Return to login</Button>
      </Child>
    </Row>
  )

  useEffect(() => {
    verifyActionCode(params?.oobCode as string)
      .then((email: string) => {
        setEmail(email);
      })
      .catch((error) => {
        setErrors(error.message);
      })
  }, []);

  useEffect(() => {
    setMode(params?.mode as string); // "resetPassword"
    setActionCode(params?.oobCode as string); // long string
  }, []);

  /* RESET PASSWORD */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await resetPassword(actionCode, newPassword);
      setErrors("");
      setResetSent(true); // hide form, display link back to login page 
    } catch(e) {
      // possible errors include weak password and expired auth code 
      setErrors(e.message);
    }
  }

  const goToLogin = () => {
    console.log("going to login page");
    history.replace('/login');
  }

  return (
    <CredentialsWrapper>
      <Row justify="center">
        <Child xs={12} sm={8} md={6} lg={4}>
          {/* Invalid oobCode, don't show form. Show error message */}
          {!email && 
            <>
            {emailInvalid()}
            </>
          }

          {email && 
            <>
              {!resetSent && 
                <>
                {passwordForm()}
                </>
              }

              {resetSent && 
                <>
                {successMessage()}
                </>
              }
            </>
          }
        </Child>
      </Row>
    </CredentialsWrapper>
  );
};

export default HandleReset;