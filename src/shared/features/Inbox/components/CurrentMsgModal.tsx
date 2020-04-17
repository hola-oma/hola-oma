import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Dialog, Box, Button} from '@material-ui/core';

import {Post} from "../../../models/post.model";
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, replyToMessage, returnToInbox}) => {

  // todo: style
    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          flexGrow: 1,
        },
        button: {
          margin: theme.spacing(1),
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
        title: {
          padding: theme.spacing(2),
          textAlign: 'center',
        }
      }),
    );

  const classes = useStyles();

  // todo: add Card (?) to display photo
  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
      <Dialog fullScreen
              open={isOpen}
              onClose={returnToInbox}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
      >

        <div className={classes.title}>
          <h1>Letter from {currentPost?.from}</h1>
        </div>

        <div className={classes.root}>
          <Box
            border={1}
            borderRadius="borderRadius"
            width={"75%"}
            height={"75%"}
            mx={"auto"}
            fontSize={24}>
              {currentPost?.message}
              {currentPost?.photoURL}
          </Box>
        </div>

        <div>
            <Grid
              container
              spacing={0}
              justify={"space-evenly"} >

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<MailIcon />}
                  onClick={returnToInbox}
                >
                  Go back to all messages
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<CreateIcon />}
                  onClick={replyToMessage}
                >
                  Reply
                </Button>
              </Grid>
            </Grid>
        </div>

      </Dialog>

  );
}

export default CurrentMsgModal;
