import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {Container, Grid, Card, CardHeader, CardContent, Box, Typography} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';

import { Post } from 'shared/models/post.model';
import {GrandparentPostContext} from "../../../../App";

import './Inbox.css';
import CurrentMsgModal from "./components/CurrentMsgModal";
import { markPostRead } from "../../../../services/post";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IInbox {
  posts: Array<Post>; // array of type "Post"
}

let currentPost: Post;

const Inbox: React.FC<IInbox> = ({ posts }) => {

    const classes = useStyles();
    let history = useHistory();
    const [currentMsgModalOpen, setCurrentMsgModalOpen] = useState<boolean>(false);

    const CurrentPost = useContext(GrandparentPostContext);

    const pressEnvelope = async function (envelopePost: Post) {
      currentPost = envelopePost;
      let postID = currentPost?.pid;
      await markPostRead(postID);
      CurrentPost.setPost(envelopePost);  // Update global post value
      setCurrentMsgModalOpen(true);
    }

    const returnToInbox = () => {
      setCurrentMsgModalOpen(false);
    }

    const replyToMessage = () => {
      setCurrentMsgModalOpen(false);
      history.push("/newPost");
    }

  return (
    <>
      <Container>
        <Grid container direction="row" justify="flex-start">
            {posts.map((post: Post, index: number) => {
              return (
                <Grid item justify="flex-start">
                  <div className={"inboxCard"} key={index} onClick={() => pressEnvelope(post)} >
                    <Card className={classes.root} variant="outlined">
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          From
                        </Typography>

                        <Typography variant="h5" component="h2">
                          {post.from}
                        </Typography>

                          {post.read? <DraftsIcon style={{ fontSize: 70 }}/> : <MailIcon style={{ fontSize: 70 }}/>}
                          {post.read? <p><i>Read</i></p> : <p><b>New!</b></p>}
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
            )
          })
          }
        </Grid>

        <CurrentMsgModal
          isOpen={currentMsgModalOpen}
          returnToInbox={returnToInbox}
          replyToMessage={replyToMessage}
        />

        <Box className="todo">
          <h3>To do items:</h3>
          <ul>
            <li>UI:
              <ul>Shrink font or truncate sender's name when sender's names are so long they distort the length of the card</ul>
              <ul>Possibly limit number of characters of display name</ul>
            </li>
            <li>Pagination:
              <ul>Max of 3 pages</ul>
              <ul>Max of 6(?) messages per page </ul>
              <ul>Only show most recent messages</ul>
            </li>
            <li>CurrentMsgModal:
              <ul>Actually render photo from URL</ul>
              <ul>Better styling</ul>
              <ul>Fix: "Warning: findDOMNode is deprecated in StrictMode.
                findDOMNode was passed an instance of Transition which is inside StrictMode.
                Instead, add a ref directly to the element you want to reference.
                Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node"</ul>
            </li>
          </ul>
        </Box>
      </Container>
    </>
  )
}


export default Inbox;