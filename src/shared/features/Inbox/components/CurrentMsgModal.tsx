import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Grid, Box } from '@material-ui/core';

import {Post} from "../../../models/post.model";

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, replyToMessage, returnToInbox}) => {

  console.log("current post: " + currentPost);

  // todo: style and make full screen
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    paper: {
        position: 'absolute',
        width: 500,
        height: 380,
        backgroundColor: "white",
        border: '2px solid gray',
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      },
    media: {
      height: 140,
    },
    })
  );

  const classes = useStyles();

  // todo: styling and make full screen
  return (
    <Modal
      open={isOpen}
      onClose={returnToInbox}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Grid container spacing={4}>

          <h2>Letter from {currentPost?.from}</h2>

          <Grid item xs={12}>
            <Box>
              {currentPost?.message}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              className="colorYes"
              variant="contained"
              size="large"
              fullWidth
              // startIcon={<CheckCircleIcon />}
              onClick={replyToMessage}>Reply
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              className="colorNo"
              variant="contained"
              size="large"
              fullWidth
              // startIcon={<CancelIcon />}
              onClick={returnToInbox}>Return to messages
            </Button>
          </Grid>

        </Grid>

      </div>
    </Modal>
  );
}

export default CurrentMsgModal;
