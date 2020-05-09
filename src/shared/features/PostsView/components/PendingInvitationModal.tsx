import React from 'react';

import { Button, Container, Dialog, DialogContentText, DialogContent } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { AccountLink } from 'shared/models/accountLink.model';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';

interface IPendingInvitationModal {
  invite: any;
  isOpen: boolean;
  onClose: () => void;
  acceptInvite: () => void;
  declineInvite: (invite: AccountLink) => void;
}

// todo: pass "Posts" into this functional component
const PendingInvitationModal: React.FC<IPendingInvitationModal> = ({ invite, isOpen, acceptInvite, declineInvite, onClose }) => {

  return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container className="padDialog">
          <Row justify="center" alignItems="center">
            <Child>
              <span className="boldText">Accept invitation from {invite?.displayName}?</span>
            </Child>
          </Row>
          <hr/>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span>Only accept invitations from people you know and recognize.</span>
            </DialogContentText>

            <Row alignItems="center" justify="space-around">
              {/* Delete account link */}

                {/* Cancel */}
                <Child xs={12} sm={4}>
                  <Button 
                    startIcon={<CancelIcon />}
                    onClick={() => declineInvite(invite)} 
                    variant="outlined"
                    className="buttonDanger">
                    Decline
                  </Button>
                </Child>

                <Child xs={12} sm={4}>
                  <Button
                    startIcon={<CheckCircleIcon />} 
                    onClick={acceptInvite} 
                    variant="contained"
                    className="buttonSafe"
                    >
                    Accept
                  </Button>
                </Child>
            </Row>

          </DialogContent>
        </Container>
      </Dialog>
  );
}

export default PendingInvitationModal;
