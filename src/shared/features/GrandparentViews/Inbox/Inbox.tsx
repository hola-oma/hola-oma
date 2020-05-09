import React from 'react';
import { useHistory } from "react-router-dom";
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Container, Grid, Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { Post } from 'shared/models/post.model';
import { markPostRead } from "../../../../services/post";

import './Inbox.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 250,
  },
  title: {
    fontSize: 22,
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
    height: '40px',
    background: '#faf9f9',
  }
  }),
);

interface IInbox {
  posts: Array<Post>; // array of type "Post"
}

let currentPost: Post;

const Inbox: React.FC<IInbox> = ({ posts }) => {

    const classes = useStyles();
    const history = useHistory();

    const pressEnvelope = async function (envelopePost: Post) {
      currentPost = envelopePost;
      let postID = currentPost?.pid;
      await markPostRead(postID);
      history.push({pathname: '/startReply', state: envelopePost } );
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
                <GridListTile key={post.pid} onClick={() => pressEnvelope(post)} rows={1.25}>
                  <img src={post.read ? require("../../../../icons/mail-open.png") : require("../../../../icons/mail-closed.png")}
                       alt={"Letter from " + post.from}
                  />
                  <GridListTileBar
                    title={"From: " + post.from}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </GridListTile>
              ))}
            </GridList>

        </Grid>
      </Container>
    </>
  )
}


export default Inbox;