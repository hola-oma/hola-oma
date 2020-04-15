import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, Grid, Box, Dialog} from '@material-ui/core';

import {Post} from "../../../models/post.model";

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, replyToMessage, returnToInbox}) => {

  // todo: style
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  const classes = useStyles();

  // todo: styling and make full screen
  return (
    <Dialog fullScreen
      open={isOpen}
      onClose={returnToInbox}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>
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
    </Dialog>
  );
}

export default CurrentMsgModal;
