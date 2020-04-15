import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, Grid, Card, CardContent, Box} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Post} from "../../../models/post.model";
import {Link} from "react-router-dom";

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, returnToInbox}) => {

  const useStyles = makeStyles((theme) => ({
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
    })
  );

  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >

      <div className={classes.paper}>
        <Grid container direction="column" spacing={4}>

          <h1>Letter from {currentPost["from"]}</h1>

          <Card variant="outlined">
            <CardContent>
              {currentPost.message}
            </CardContent>
          </Card>

          <div className={"replyButton"}>
            <Link to={"/newPost"}>
              <Button variant="outlined">Reply</Button>
            </Link>
          </div>

          <div className={"returnButton"}>
            <Link to={"/posts"}>
              <Button variant="outlined">Close</Button>
            </Link>
          </div>

          <Grid item xs={12}>
            <Button
              className="colorYes"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<CheckCircleIcon />}
              onClick={returnToInbox}>See all your messages
            </Button>
          </Grid>

          <p>{currentPost}</p>

        </Grid>

        <Box className="todo">
          <h3>To do items:</h3>
          <ul>
            <li>Create routes for each reply option</li>
            <li>Make pretty</li>
          </ul>
        </Box>

      </div>
    </Modal>
  );
}

export default CurrentMsgModal;
