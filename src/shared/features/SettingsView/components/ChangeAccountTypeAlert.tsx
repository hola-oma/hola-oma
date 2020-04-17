import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core';
import { roles } from 'enums/enums';

interface IChangeAccountTypeAlert {
  isOpen: boolean;
  onClose: () => void;
  role: string;
  changeRole: (role: string) => void;
}

const ChangeAccountTypeAlert: React.FC<IChangeAccountTypeAlert> = ({ isOpen, onClose, role, changeRole }) => { 

  const [tempRole, setTempRole] = useState("");

  useEffect(() => {
    setTempRole(role);
  }, [role]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">Change user role</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Warning! This will affect the content you see and the features available to you in Hola, Oma! You should only make this change if you are sure you need to switch account types.
      </DialogContentText>
    </DialogContent>
    <DialogActions>

      {/* Delete account link */}
      <Grid container>
        <Grid item xs={12}>

          <label>
          <input
            type="radio"
            name="accountType"
            id="receiver"
            value="receiver"
            checked={tempRole === roles.receiver}
            onChange={() => setTempRole(roles.receiver)}
            />
            <b>Receive</b> posts from family members
          </label>
          <br/>

          <label>
            <input
              type="radio"
              name="accountType"
              id="poster"
              value="poster"
              checked={tempRole === roles.poster}
              onChange={() => setTempRole(roles.poster)}
              />
            <b>Create posts</b> for others to see
          </label>
        </Grid>

        <Grid item sm={4}>
          <Button onClick={onClose} size="small" className="pullRight">
            Cancel
          </Button>
        </Grid>
        
        <Grid item sm={6}>
          <Button onClick={() => changeRole(tempRole)} size="small" className="buttonSafe pullRight">
            Confirm selection
          </Button>
        </Grid>

      </Grid>
      
    </DialogActions>
  </Dialog>
  );
}

export default ChangeAccountTypeAlert;
