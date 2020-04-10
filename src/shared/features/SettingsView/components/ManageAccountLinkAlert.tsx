import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { AccountLink } from 'shared/models/accountLink.model';

interface IManageAccountLinkAlert {
  isOpen: boolean;
  onClose: () => void;
  friend: AccountLink;
  muteFriend: (friend: AccountLink) => void;
  unfriendFriend: (friend: AccountLink) => void;
}

const ManageAccountLinkAlert: React.FC<IManageAccountLinkAlert> = ({ isOpen, onClose, friend, muteFriend, unfriendFriend }) => { 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Manage link"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        What do you want to do with this person?
      </DialogContentText>
    </DialogContent>
    <DialogActions>

      {/* Delete account link */}
      <Button onClick={() => unfriendFriend(friend)} color="primary" autoFocus>
        Remove friend
      </Button>

      {/* Cancel */}
      <Button onClick={onClose} variant="outlined" color="primary">
        Nevermind (don't change anything)
      </Button>
      
    </DialogActions>
  </Dialog>
  );
}

export default ManageAccountLinkAlert;
