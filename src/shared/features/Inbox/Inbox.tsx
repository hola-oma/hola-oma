// https://stackoverflow.com/questions/58708542/how-to-properly-update-state-with-firebase-and-useeffect

import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {Container, Grid, Card, CardHeader, CardContent, Box} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';

import { Post } from 'shared/models/post.model';

import './Inbox.css';
import CurrentMsgModal from "./components/CurrentMsgModal";
import {markPostRead} from "../../../services/post";
import PostsView from "../PostsView/PostsView";
import * as firebase from "firebase";

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

let currentPost:Post;

const Inbox: React.FC<IInbox> = ({ posts }) => {

    const classes = useStyles();
    const [currentMsgModalOpen, setCurrentMsgModalOpen] = useState<boolean>(false);

    const pressEnvelope = async function (envelopePost: Post) {
      currentPost = envelopePost;
      let postID = currentPost?.pid;
      await markPostRead(postID)
        .then(() => console.log("updated post read in database"));
      setCurrentMsgModalOpen(true);
    }

    const returnToInbox = () => {
      console.log("Message closed");
      setCurrentMsgModalOpen(false);
    }

    const replyToMessage = () => {
      console.log("Grandparent wants to reply!");
      setCurrentMsgModalOpen(false);
    }

  return (
    <>
      <Container>
        <Grid container>
          {
            // {this.state.links.map((item) => // example from Stack Overflow
            posts.map((post: Post, index: number) => {
              return (
                <div className={"inboxCard"} key={index} onClick={() => pressEnvelope(post)} >
                  <Card className={classes.root} variant="outlined">
                    <CardHeader
                      title={post.from}>
                    </CardHeader>
                    <CardContent>
                      {post.read? <DraftsIcon className="icon"/> : <MailIcon className="icon"/>}
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
        </Grid>

        <CurrentMsgModal
          isOpen={currentMsgModalOpen}
          currentPost={currentPost}
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