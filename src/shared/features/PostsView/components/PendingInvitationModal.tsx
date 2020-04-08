import React from 'react';

import { makeStyles, createStyles, withTheme } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

interface IPendingInvitationModal {
  invite: any,
  isOpen: boolean;
  onClose: () => void;
}

// todo: pass "Posts" into this functional component
const PendingInvitationModal: React.FC<IPendingInvitationModal> = ({ invite, isOpen, onClose }) => {

  const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
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
          <p>Invite stuff here</p>
          <button>Accept</button>
        </div>
      </Modal>
  );
}

export default PendingInvitationModal;
