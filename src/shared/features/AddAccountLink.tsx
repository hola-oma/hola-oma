import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { createLinkByEmail } from 'services/accountLink';
import BigInput from 'shared/components/BigInput/BigInput';
import CredentialsWrapper from 'shared/components/CredentialsWrapper';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';
import CredentialsLeftTitle from 'shared/components/CredentialsLeftTitle';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormSubmitButton from 'shared/components/FormSubmitButton';
import FormError from 'shared/components/FormError/FormError';

interface IAddAccountLink extends RouteComponentProps {
  // empty for now, just need this for the "extends RouteComponentProps" part 
}

const AddAccountLink: React.FC<IAddAccountLink> = ({ history }) => {
  const [emailAddress, setEmailAddress] = useState("");

  const [error, setErrors] = useState("");
  const [emailAddressError, setEmailAddressError] = useState(false);

  const updateEmailInput = (e: any) => {
    setEmailAddress(e.target.value);
  }

  const handleEmailForm = async (e: any) => {
    e.preventDefault();

    if (emailAddress === "") {
      setErrors("Please enter an email address.");
      setEmailAddressError(true);
    } else {
      try {
        let linkCreated = await createLinkByEmail(emailAddress);

        if (linkCreated) {
          console.log("invite successfully sent to: ", emailAddress);
          if (history) history.push('/posts');
        } else {
          console.log("No invite was sent");
        }
      } catch(e) {
        setEmailAddressError(true);
        setErrors(e.message);
      }
    }
  }

  return (
    <CredentialsWrapper>
      <Row justify="center">
        <Child xs={12} sm={8} md={6} lg={4}>
          <CredentialsLeftTitle icon={<AccountCircleIcon />} title="Link up with a family member" subtitle="Invite a family member or close friend to see your posts. The person you invite must already have an Hola, Oma! account." />

          <form onSubmit={e => handleEmailForm(e)} noValidate>
            
            <Child xs={12}>
              <BigInput 
                error={emailAddressError}
                labelText="Enter their E-Mail address"
                name="emailAddress"
                required={true} 
                value={emailAddress}
                autoFocus={true}
                autoComplete="off"
                type="text"
                onChange={updateEmailInput}/>
            </Child>

            <FormSubmitButton buttonText="Send Invitation"/>
            <FormError error={error}/>

          </form>
        </Child>
      </Row>
    </CredentialsWrapper>
  );
}

export default AddAccountLink;
