import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core';
import { AccountLink } from 'shared/models/accountLink.model';

interface IManageAccountLinkAlert {
  isOpen: boolean;
  onClose: () => void;
  friend: AccountLink;
  unfriendFriend: (friend: AccountLink) => void;
}

const ManageAccountLinkAlert: React.FC<IManageAccountLinkAlert> = ({ isOpen, onClose, friend, unfriendFriend }) => { 

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">No more updates from {friend.displayName}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Warning! You will not get any more updates from {friend.displayName}. Do you want to continue? 
      </DialogContentText>
    </DialogContent>
    <DialogActions>

      {/* Delete account link */}
      <Grid container>
        <Grid item sm={4}>
        <Button onClick={() => unfriendFriend(friend)} variant="outlined" size="small" className="buttonDanger" autoFocus>
            Remove them
          </Button>
      </Grid>

      {/* Cancel */}
        <Grid item sm={6}>
          <Button onClick={onClose} size="small" className="buttonSafe pullRight">
            Stay connected
          </Button>
        </Grid>
      </Grid>
      
    </DialogActions>
  </Dialog>
  );
}

export default ManageAccountLinkAlert;
