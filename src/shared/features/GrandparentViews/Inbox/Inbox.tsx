import React from 'react';
import { useHistory } from "react-router-dom";
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { Post } from 'shared/models/post.model';
import { navigationIcons } from "../../../../Icons";

import './Inbox.css';
import { markPostRead, getPostReadByCurrentUser } from "../../../../services/post";
import GrandparentLayout from "../Components/GrandparentLayout";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      minWidth: 250,
      maxWidth: 250,
    },
    title: {
      fontSize: 22,
      color: 'black',
      textAlign: 'center'
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
      <GrandparentLayout
        boxContent={
          <Grid container spacing={0}>
            {posts.length === 0 &&
            <Grid item xs>
                <Typography variant="h4">Your mailbox is empty</Typography>
            </Grid>
            }

            <GridList
              className={classes.gridList}
              cols={3}
              spacing={0}
              cellHeight={160}   // 180 is default
            >
              {posts.map((post, index: number) => (
                <GridListTile key={post.pid} onClick={() => pressEnvelope(post)} rows={1.25}>
                  <img src={getPostReadByCurrentUser(post) ? require("../../../../icons/mail-open.png") : require("../../../../icons/mail-closed.png")}
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
        }
        buttonText={["Next messages"]}
        buttonActions={[() => console.log("Go to next 6 messages")]}
        buttonIcons={[navigationIcons.forward]}

      />



    </>
  )
}


export default Inbox;