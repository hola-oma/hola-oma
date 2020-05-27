import React, { useState } from "react";

import HelpIcon from '@material-ui/icons/Help';

import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // if database type is firestore, import this 
import 'firebase/database'; // for additional user properties, like role 

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { sendPasswordResetEmail } from 'services/user';
import BigInput from "shared/components/BigInput/BigInput";
import Row from "shared/components/Row/Row";
import Child from "shared/components/Child/Child";
import Column from "shared/components/Column/Column";
import CredentialsLeftTitle from "shared/components/CredentialsLeftTitle";
import CredentialsForm from "shared/components/CredentialsForm/CredentialsForm";
import ViewWrapper from "shared/components/ViewWrapper";

interface IResetPassword extends RouteComponentProps<any> {
  // empty for now 
}

const ResetPassword: React.FC<IResetPassword> = () => {

  const [emailForReset, setEmailForReset] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [error, setErrors] = useState("");

  const updateEmailForReset = (e: any) => {
    setEmailForReset(e.target.value);
  }

  const emailAddressInput = () => (
    <BigInput
      error={false} 
      labelText="E-Mail Address"
      name="email"
      required={true}
      value={emailForReset}
      autoFocus={true}
      autoComplete="current-email"
      type="text"
      onChange={updateEmailForReset}/>
  )

  /* REQUEST A PASSWORD RESET EMAIL BE SENT TO THIS EMAIL ADDRESS */
  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(emailForReset);
      setErrors("");
      setResetSent(true);
    } catch(e) {
      console.log(e);
      // possible errors include email address doesn't exist in db 
      setErrors(e.message);
    }
  }

  return (
    <ViewWrapper showCopyright={true}>

      {/* Row contains side-by-side form elements */}
      <Row justify="space-around">

        {/* LEFT CHILD: TITLE, HELP */}
        <Child xs={12} sm={8} md={4}>
          <Column justify="space-between">
            <CredentialsLeftTitle icon={<HelpIcon />} title="Reset password" subtitle="Enter the e-mail address you used when you signed up and we’ll send a link to reset your password." />
          </Column>
        </Child>

        {/* RIGHT CHILD: REGISTRATION FORM */}
        <Child xs={12} sm={8} md={5}>
          <Column justify="center" alignItems="center">
  
          <CredentialsForm onSubmit={handleForm} submitText="Send e-mail" showSuccess={resetSent} error={error}>

            <Child item xs={12}>
              {emailAddressInput()}
            </Child>

          </CredentialsForm>

          </Column>
        </Child>
      </Row>
    </ViewWrapper>
  );
};

export default ResetPassword;