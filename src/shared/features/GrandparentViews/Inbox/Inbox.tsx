import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import {
  Box,
  CardContent,
  CardMedia,
  Grid,
  GridList,
  Typography,
  Button,
  Modal
} from '@material-ui/core';

import {Post} from 'shared/models/post.model';

import './Inbox.css';

import {markPostRead} from "../../../../services/post";
import Column from "../../../components/Column/Column";
import InboxLetter from './components/InboxLetter/InboxLetter';
import Child from 'shared/components/Child/Child';
import Row from 'shared/components/Row/Row';

import { mailIcons } from "../../../../Icons";

import ExtendedInbox from './components/ExtendedInbox/ExtendedInbox';

interface IInbox {
  posts: Array<Post>; // array of type "Post"
}

let currentPost: Post;

const Inbox: React.FC<IInbox> = ({ posts }) => {

  const history = useHistory();

  const [extendedInboxOpen, setExtendedInboxOpen] = useState<boolean>(false);

  const pressEnvelope = async function (envelopePost: Post) {
    currentPost = envelopePost;
    let postID = currentPost?.pid;
    await markPostRead(postID);
    history.push({pathname: '/startReply', state: envelopePost } );
  }

  const openModal = () => {
    setExtendedInboxOpen(true);
  }

  const handleModalClose = () => {
    setExtendedInboxOpen(false);
  }

  return (
    <>
      <Column justify="center">

        {/*Content Box*/}
        <Grid item xs={12} className={`noInboxMargin`} id="inbox-grid">
          <Box
            id="inbox-box"
            className={`grandparentBoxWidth inboxBox ${posts.length === 0 ? 'centeredEmptyMailbox' : ''}`}
            border={1}
            mx={"auto"}
            fontSize={20}
            display={"flex"}
            alignItems={"center"}
            style={{ overflowY: "hidden" }}>

            {/*If mailbox empty*/}
            {posts.length === 0 &&
              <Grid item xs={8}>
                <div>
                  <CardMedia className={`emptyMailbox`}
                             image={require("../../../../icons/empty-mailbox.png")}
                             title="Empty Mailbox" />
                  <CardContent>
                      <Typography variant="h4" align={"center"}>Your mailbox is empty</Typography>
                  </CardContent>
                </div>
              </Grid>
            }

            {/*If mailbox not empty*/}
            {posts.length > 0 &&
              <>
                <Row className="height100">
                  <Child xs={12} className="height100">
                    <GridList 
                        className="inboxGridList"
                        spacing={2}
                        id="grid-list-inbox"
                      >
                      {posts.map((post, index: number) => (
                        <>
                        {index < 6 && 
                          <InboxLetter post={post} key={post.pid} onClickHandler={pressEnvelope}/>
                        }
                        </>
                      ))
                      }
                      <Child container xs={12} justify="flex-end" style={{height:'auto', paddingTop:'15px'}}>
                        <Button style={{height:'auto'}} endIcon={mailIcons.paperAirplane} onClick={openModal} className="olderLettersButton">View all letters</Button>
                      </Child>
                    </GridList>
                  </Child>
                </Row>
              </>
            }
          </Box>
        </Grid>
      </Column>

      <Modal
        open={extendedInboxOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ExtendedInbox posts={posts}/>
      </Modal>
    </>
  )
}


export default Inbox;