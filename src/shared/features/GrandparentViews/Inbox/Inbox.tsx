import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { iconSvgPaths } from "../../../../Icons";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  CardActionArea,
  CardMedia, ButtonBase
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { Post } from 'shared/models/post.model';
import { mailIcons } from "../../../../Icons";
import {GrandparentPostContext} from "../../../../App";

import './Inbox.css';
import CurrentMsgModal from "./components/CurrentMsgModal";
import { markPostRead } from "../../../../services/post";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 250
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'absolute',
    bottom: '30px'
    // padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 1}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}),
);

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
        <Grid container>
          {posts.map((post: Post, index: number) => {
            return (
              <div className={"inboxCard"} key={index} onClick={() => pressEnvelope(post)} >
                <ButtonBase
                  key={post.from}
                  className={classes.image}
                  style={{
                    width: 250,
                  }}
                >
          <span
            className={classes.imageSrc}
            style={{
              // I don't know why but this only works if it's all on one line
              backgroundColor: "fff",
              backgroundImage: `url('data:image/svg+xml; utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>')`,
            }}
          />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {post.from}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
                </ButtonBase>
              </div>
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