import React from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  GridList,
  Typography,
  Button
} from '@material-ui/core';

import {Post} from 'shared/models/post.model';

import './Inbox.css';

import {markPostRead} from "../../../../services/post";
import Column from "../../../components/Column/Column";
import InboxLetter from './components/InboxLetter/InboxLetter';
import AlarmIcon from '@material-ui/icons/Alarm';
import Child from 'shared/components/Child/Child';
import Row from 'shared/components/Row/Row';

import { mailIcons } from "../../../../Icons";

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      color: 'black',
      textAlign: 'center'
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
        <Grid item xs={12} className={`noInboxMargin ${classes.root}`} id="inbox-grid">
          <Box
            id="inbox-box"
            className={`grandparentBoxWidth inboxBox`}
            border={1}
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
              <>
              <Row>
                <Child xs={12}>
                  <GridList 
                      className={`inboxGridList`}
                      spacing={2}
                      id="grid-list-inbox"
                    >
                    {posts.map((post, index: number) => (
                      <InboxLetter post={post} key={post.pid} onClickHandler={pressEnvelope}/>
                    ))
                    }
                  </GridList>
                </Child>

                <Child container xs={12} justify="flex-end">
                  {/* mailIcons.paperAirplane */}
                  <Button endIcon={mailIcons.paperAirplane} className="olderLettersButton">View older letters</Button>
                </Child>
              </Row>
              </>
            }
          </Box>
        </Grid>
      </Column>
    </>
  )
}


export default Inbox;