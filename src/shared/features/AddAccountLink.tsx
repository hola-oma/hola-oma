import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import { Container, Grid, TextField, Button, Box } from '@material-ui/core';

import { createLinkByID } from 'services/accountLink';

interface IAddAccountLink extends RouteComponentProps {
  // empty for now, just need this for the "extends RouteComponentProps" part 
}

const AddAccountLink: React.FC<IAddAccountLink> = ({ history }) => {
  const [accountID, setAccountID] = useState("");
  const [error, setErrors] = useState("");

  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      let linkCreated = await createLinkByID(accountID);
      
      if (linkCreated) {
        console.log("link to account successfully created");
        if (history) history.push('/posts');
      }
    } catch(e) {
      setErrors(e.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box className="devBox">
        <p>Passphrase</p>
        <h1>AB4P</h1>
        <p>Ask your family member to enter this pass phrase to link your accounts.</p>
      </Box>

      <p>Alternatively, link to them by entering their ACCOUNT ID below:</p>
      <form onSubmit={e => handleForm(e)} noValidate>
        <Grid container spacing={2}>
          <p>[Linking by account ID is temporary and for dev purposes only]</p>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="accountID"
              label="Account ID"
              name="accountID"
              autoComplete="accountID"
              value={accountID}
              onChange={e => setAccountID(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Link to this account
          </Button>
      </form>
      <span className="error">{error}</span>
    </Container>
  );
}

export default AddAccountLink;