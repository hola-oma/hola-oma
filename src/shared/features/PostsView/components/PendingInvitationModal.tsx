import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Grid } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

interface IPendingInvitationModal {
  invite: any;
  isOpen: boolean;
  onClose: () => void;
  acceptInvite: () => void;
  declineInvite: () => void;
}

// todo: pass "Posts" into this functional component
const PendingInvitationModal: React.FC<IPendingInvitationModal> = ({ invite, isOpen, acceptInvite, declineInvite, onClose }) => {

  const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        height: 380,
        backgroundColor: "white",
        border: '2px solid gray',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      },
    })
  );

  const classes = useStyles();

  return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Grid container direction="column" spacing={4}>
            
            <h2>Accept invite from {invite?.displayName}?</h2>

            <Grid item xs={12}>
              <Button 
                className="colorYes"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CheckCircleIcon />}
                onClick={acceptInvite}>Accept invitation
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                className="colorNo"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<CancelIcon />}
                onClick={declineInvite}>No, I don't know this person
              </Button>
            </Grid>

          </Grid>

        </div>
      </Modal>
  );
}

export default PendingInvitationModal;
