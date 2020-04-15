import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { Container, Grid, Button, Box } from '@material-ui/core';

import { createLinkByEmail } from 'services/accountLink';
import BigInput from 'shared/components/BigInput/BigInput';

interface IAddAccountLink extends RouteComponentProps {
  // empty for now, just need this for the "extends RouteComponentProps" part 
}

const AddAccountLink: React.FC<IAddAccountLink> = ({ history }) => {
  const [emailAddress, setEmailAddress] = useState("");

  const [error, setErrors] = useState("");

  const updateEmailInput = (e: any) => {
    setEmailAddress(e.target.value);
  }

  const handleEmailForm = async (e: any) => {
    e.preventDefault();

    try {
      let linkCreated = await createLinkByEmail(emailAddress);

      if (linkCreated) {
        console.log("invite successfully sent to: ", emailAddress);
        if (history) history.push('/posts');
      }

    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">

      <form onSubmit={e => handleEmailForm(e)} noValidate>
        
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box className="devBox">
              <p>Passphrase</p>
              <h1>AB4P</h1>
              <p>Ask your family member to enter this pass phrase to link your accounts. [Not yet implemented]</p>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <BigInput 
                labelText="Enter someone's e-mail address"
                name="emailAddress"
                required={true} 
                value={emailAddress}
                autoFocus={true}
                autoComplete="off"
                type="text"
                onChange={updateEmailInput}/>
          </Grid>


          <Grid item xs={12}>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Send Invitation
            </Button>
            </Grid>
          </Grid>
      </form>
      <span className="error">{error}</span>
    </Container>
  );
}

export default AddAccountLink;