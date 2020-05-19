import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import {Grid, GridList, GridListTile, GridListTileBar, Typography} from '@material-ui/core';

import {Post} from 'shared/models/post.model';
import {navigationIcons} from "../../../../Icons";

import './Inbox.css';
import {getPostReadByCurrentUser, markPostRead} from "../../../../services/post";
import GrandparentLayout from "../Components/GrandparentLayout";

const useStyles = makeStyles(() => ({
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
let messageIndex: number = 0;

const Inbox: React.FC<IInbox> = ({ posts }) => {

  const classes = useStyles();
  const history = useHistory();
  const [currentMessages, setCurrentMessages] = useState<Array<Post>>(posts.slice(0, 6));

  const pressEnvelope = async function (envelopePost: Post) {
      currentPost = envelopePost;
      let postID = currentPost?.pid;
      await markPostRead(postID);
      history.push({pathname: '/startReply', state: envelopePost } );
    }

  const getNextMessages = () => {
    console.log("Go to next 6 messages");
    messageIndex += 6;
    console.log("message index set to: " + messageIndex);
    setCurrentMessages(posts.slice(messageIndex, messageIndex + 6));
  }

  return (
    <>
      <GrandparentLayout
        boxContent={
          <Grid container spacing={0}>
            {posts.length === 0 &&
            <Grid item xs>
                <Typography variant="h4">Your mailbox is empty</Typography>
            </Grid> }

            <GridList
              className={classes.gridList}
              cols={3}
              spacing={0}
              cellHeight={160}   // 180 is default
            >
              {currentMessages.map((post, index: number) => (
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
        buttonText={
          ["Previous Messages", "Next Messages"]
        }
        buttonActions={[
            () => console.log("GetPrevMessages"),
            () => getNextMessages()
          ]}
        buttonIcons={[navigationIcons.back, navigationIcons.forward]}

      />
    </>
  )
}


export default Inbox;