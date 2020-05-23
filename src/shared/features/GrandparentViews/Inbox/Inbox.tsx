import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

import './Inbox.css';
import {getPostReadByCurrentUser, markPostRead} from "../../../../services/post";
import Column from "../../../components/Column/Column";
import {boxDimensions} from "../Components/GrandparentLayout";

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      color: 'black',
      textAlign: 'center'
    },
    gridList: {
      height: '100%',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
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

const Inbox: React.FC<IInbox> = ({ posts }) => {

  const theme = useTheme();

  // this looks wacky but React doesn't let you use 'useMediaQuery' inside a function
  const screenExtraLarge = useMediaQuery(theme.breakpoints.only('xl'));
  const screenLarge = useMediaQuery(theme.breakpoints.only('lg'));
  const screenMedium = useMediaQuery(theme.breakpoints.only('md'));
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));
  const screenExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 6;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 3;
    } else if (screenExtraSmall) {
      return 2;
    } else {
      return 3;
    }
  }

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
      <Column justify="center">

        {/*Content Box*/}
        <Grid item xs={12} className={classes.root} id="inbox-grid">
          <Box
            id="inbox-box"
            className="grandparentBox"
            border={1}
            borderRadius="borderRadius"
            mx={"auto"}
            fontSize={20}
            display={"flex"}
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
              <GridList 
                  className={classes.gridList} 
                  cols={getScreenWidth()}  // cols={tile.featured ? 2 : 1}  query screen width 
                  spacing={2}
                  id="grid-list-inbox"
                >
                {posts.map((post, index: number) => (
                  <GridListTile
                    id={`grid-list-tile-${post.pid}`}
                    className="inboxLetter"
                    key={post.pid}
                    onClick={() => pressEnvelope(post)}
                    rows={1.25} >
                    <img 
                        src={getPostReadByCurrentUser(post) ? require("../../../../icons/mail-open.png") : require("../../../../icons/mail-closed.png")}
                        alt={"Letter from " + post.from} 
                    />

                  <GridListTileBar
                    title={"From: " + post.from}
                    className="inboxTitle"
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