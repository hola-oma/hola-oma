import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { Container, Grid, Button, Box } from '@material-ui/core';

import { createLinkByEmail } from 'services/accountLink';
import BigInput from 'shared/components/BigInput/BigInput';
import Alert from '@material-ui/lab/Alert';

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
    <Grid container className="credentialsForm" spacing={2} justify="center">
      <Grid item xs={10} md={8}>

        <form onSubmit={e => handleEmailForm(e)} noValidate>
        
          <Grid container spacing={2} justify="center">

            <Grid item xs={12} sm={8}>
              <Box className="devBox">
                <p>Passphrase</p>
                <h1>AB4P</h1>
                <p>Ask your family member to enter this pass phrase to link your accounts. [Not yet implemented]</p>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={8}>
              <BigInput 
                  error={emailAddressError}
                  labelText="Enter someone's e-mail address"
                  name="emailAddress"
                  required={true} 
                  value={emailAddress}
                  autoFocus={true}
                  autoComplete="off"
                  type="text"
                  onChange={updateEmailInput}/>
            </Grid>


            <Grid item xs={12} sm={8}>
              <Button 
                type="submit"
                className="bigButton"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Send Invitation
              </Button>
              </Grid>

              {error &&
                <Alert className="error" severity="error">{error}</Alert>
              }

            </Grid>
        </form>
      </Grid>
      </Grid>
  );
}

export default AddAccountLink;
