import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { Grid, Button, Typography } from '@material-ui/core';

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
        <div>
          <Typography component="h1" variant="h4">
            Link up with a family member
          </Typography>
          <p>Invite a family member or close friend to see your posts. The person you invite must already have an <i>Hola, Oma!</i> account.</p>
        </div>

        <form onSubmit={e => handleEmailForm(e)} noValidate>
        
          <Grid container spacing={2} justify="center">

{/* 
            <Grid item xs={12} sm={8}>
              <Box className="devBox">
                <p>Passphrase</p>
                <h1>AB4P</h1>
                <p>Ask your family member to enter this pass phrase to link your accounts. [Not yet implemented]</p>
              </Box>
            </Grid>
  */}
            
            <Grid item xs={12} sm={8}>
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
