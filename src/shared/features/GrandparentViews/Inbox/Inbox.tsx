import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { Post } from 'shared/models/post.model';
import {GrandparentPostContext} from "../../../../App";

import './Inbox.css';
import CurrentMsgModal from "./components/CurrentMsgModal";
import { markPostRead } from "../../../../services/post";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 250,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  gridList: {
    height: '500px',
    flexWrap: 'wrap',
    alignItems: 'center',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    width: '300px',
    height: '30px',
    background: '#80cbc4',
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
          {posts.length === 0 &&
              <Grid item xs>
                  <Typography variant="h2">Your mailbox is empty</Typography>
              </Grid>
          }

            <GridList className={classes.gridList} cols={3}>
              {posts.map((post, index: number) => (
                <GridListTile key={post.from} onClick={() => pressEnvelope(post)}>
                  <img src={post.read ? require("../../../../icons/mail-open.png") : require("../../../../icons/mail-closed.png")}
                       alt={"Letter from " + post.from}
                  />
                  <GridListTileBar
                    title={"Letter from " + post.from}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </GridListTile>
              ))}
            </GridList>

        </Grid>

        <CurrentMsgModal
          isOpen={currentMsgModalOpen}
          returnToInbox={returnToInbox}
          replyToMessage={replyToMessage}
        />
      </Container>
    </>
  )
}


export default Inbox;