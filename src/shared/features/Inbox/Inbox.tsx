import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {Container, Grid, Card, CardHeader, CardContent, Box} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';

import { Post } from 'shared/models/post.model';

import './Inbox.css';
import CurrentMsgModal from "./components/CurrentMsgModal";

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

  const pressEnvelope = function(envelopePost: Post) {
    currentPost = envelopePost;
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
          <li>Style modal and make full screen</li>
          <li>General UI styling</li>
          <li>Shrink font or truncate sender's name when sender's names are so long they distort the length of the card</li>
        </ul>
      </Box>
    </Container>
      </>
  )
};

export default Inbox;