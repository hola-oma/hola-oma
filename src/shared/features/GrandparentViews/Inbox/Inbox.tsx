import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from '@material-ui/core';

import {Post} from 'shared/models/post.model';
import {navigationIcons} from "../../../../Icons";

import './Inbox.css';
import {getPostReadByCurrentUser, markPostRead} from "../../../../services/post";
import Column from "../../../components/Column/Column";
import {boxDimensions} from "../Components/GrandparentLayout";

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      fontSize: 22,
      color: 'black',
      textAlign: 'center'
    },
    gridList: {
      height: '500px',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      height: '40px',
      background: '#faf9f9',
    },
    media: {
      height: 400,
      objectFit: "scale-down"
    },
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
  const [buttonsDisabled, setButtonsDisabled]  = useState<Array<boolean>>([true, false]);

  const pressEnvelope = async function (envelopePost: Post) {
      currentPost = envelopePost;
      let postID = currentPost?.pid;
      await markPostRead(postID);
      history.push({pathname: '/startReply', state: envelopePost } );
    }

  const getNextMessages = () => {
    console.log("Go to next 6 messages");
    if (messageIndex < 12) { messageIndex += 6; }
    updateButtonsDisabled();
    setCurrentMessages(posts.slice(messageIndex, messageIndex + 6));
  }

  const getPrevMessages = () => {
    console.log("Go back 6 messages");
    if (messageIndex > 0) { messageIndex -= 6; }
    updateButtonsDisabled();
    setCurrentMessages(posts.slice(messageIndex, messageIndex + 6));
  }

  const updateButtonsDisabled = () => {
    if (messageIndex === 0) { setButtonsDisabled([true, false]); }
    if (messageIndex === 6) { setButtonsDisabled([false, false]); }
    if (messageIndex === 12) { setButtonsDisabled([false, true]); }
  }

  return (
    <>
      <Column justify="center">

        {/*Content Box*/}
        <Grid item xs={12} className={classes.root}>
          <Box
            border={1}
            borderRadius="borderRadius"
            mx={"auto"}
            fontSize={24}
            display={"flex"}
            height={boxDimensions.height}
            width={boxDimensions.width}
            alignItems={"center"}
            style={{ overflowY: "hidden" }}>

            {/*If mailbox empty*/}
            {posts.length === 0 &&
              <Grid item xs={12}>
                <Card>
                  <CardMedia className={classes.media}
                             image={require("../../../../icons/empty-mailbox.png")}
                             title="Empty Mailbox" />
                  <CardContent>
                      <Typography variant="h4" align={"center"}>Your mailbox is empty</Typography>
                  </CardContent>
                </Card>
              </Grid>
            }

            {/*If mailbox not empty*/}
            {posts.length > 0 &&
              <GridList className={classes.gridList} cols={3}>
                {posts.map((post, index: number) => (
                  <GridListTile
                    key={post.pid}
                    onClick={() => pressEnvelope(post)}
                    rows={1.25} >
                    <img src={getPostReadByCurrentUser(post) ? require("../../../../icons/mail-open.png") : require("../../../../icons/mail-closed.png")}
                       alt={"Letter from " + post.from} />

                  <GridListTileBar
                    title={"From: " + post.from}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }} />
                  </GridListTile>
                ))}
              </GridList>
            }

          </Box>
        </Grid>
      </Column>
    </>
  )
}


export default Inbox;