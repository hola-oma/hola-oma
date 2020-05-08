import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid, Typography, Container } from '@material-ui/core';
import { AccountLink } from 'shared/models/accountLink.model';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';
import WarningIcon from '@material-ui/icons/Warning';
import { roles } from 'enums/enums';

interface IManageAccountLinkAlert {
  isOpen: boolean;
  onClose: () => void;
  friend: AccountLink;
  unfriendFriend: (friend: AccountLink) => void;
  role: String;
}

const ManageAccountLinkAlert: React.FC<IManageAccountLinkAlert> = ({ isOpen, onClose, friend, unfriendFriend, role }) => { 

  const getRemovalString = () => {
    if (role === roles.poster) {
      return `You will no longer be able to share updates with ${friend.displayName}.`;
    } else if (role === roles.receiver) {
      return `You will no longer receive updates from ${friend.displayName}.`;
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Container className="padDialog">
        <Row justify="center" alignItems="center">
          <Child>
            <WarningIcon color="error"/>&nbsp;
          </Child>

          <Child>
            <span className="boldText">Remove your link with {friend.displayName}</span>
          </Child>
        </Row>
        <hr/>


      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <span><b>Warning! </b>{getRemovalString()}</span>
          <br/><br/>
          <span>Please confirm your choice.</span>
        </DialogContentText>

        <Row alignItems="center" justify="space-around">
          {/* Delete account link */}
          <Child xs={12} sm={4}>
            <Button onClick={() => unfriendFriend(friend)} variant="outlined" className="buttonDanger">
              Remove them
            </Button>
          </Child>

          {/* Cancel */}
          <Child xs={12} sm={4}>
            <Button onClick={onClose} className="buttonSafe">
              Stay connected
            </Button>
          </Child>
        </Row>

      </DialogContent>
    </Container>
  </Dialog>
  );
}

export default ManageAccountLinkAlert;
