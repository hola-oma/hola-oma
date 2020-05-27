import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import { useLocation, useHistory } from "react-router";

import {mailIcons, replyEmojiPNGs} from "../../../../Icons";
import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import {Grid} from "@material-ui/core";
import {Post} from "../../../models/post.model";
import { REPLY_TYPES } from "../../../models/reply.model";

import MailOutlineIcon from '@material-ui/icons/MailOutline';

import '../Grandparent.css';
import Child from 'shared/components/Child/Child';
import Row from 'shared/components/Row/Row';

export const SentGrandparentReply: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const state: any = location.state;

  const [envelopeHidden, setEnvelopeHidden] = useState<boolean>(false);

  const replyContent = state.replyContent;
  const currentPost: Post = state.currentPost;
  let boxContent: any = {}

  const buildSentMessage = (message: string) => (
    <Row alignItems="center" justify="center" alignContent="center">
      <Child xs={12} className="envelopeContainer">
          <MailOutlineIcon className={`envelope envelopeAnimation ${envelopeHidden ? 'hideEnvelope' : ''}`} fontSize={"inherit"}/>
      </Child>
  
      <Child xs={12} className="replyWasSentText">
        <p className="opacityTransition fadeIn">
          {message}
        </p>
      </Child>
    </Row>
  )

  if (replyContent.replyType === REPLY_TYPES.EMOJI) {
    boxContent = buildSentMessage("Your reply was sent!");
  }

  if (replyContent.replyType === REPLY_TYPES.PHOTO) {
    boxContent = buildSentMessage("Lookin' good! Your photo was sent.");
  }

  if (replyContent.replyType === REPLY_TYPES.VOICE) {
    boxContent = buildSentMessage("Your reply was sent!");
  }

  {/* 

  if (replyContent.replyType === REPLY_TYPES.EMOJI) {
    const sentEmojis: Array<string> = [];
    const allEmojis: Array<string> = replyEmojiPNGs();
    (replyContent.message).forEach(function(index: number) {
      sentEmojis.push(allEmojis[index]);
    })

    boxContent =
      <Grid container justify={"center"}>
        {sentEmojis.map((icon, index: number) => (
          <ButtonBase
            key={uuid()}
            className={classes.image}
            style={{width: '33%'}}
            >
            <span className={classes.imageSrc} style={{backgroundImage: `url(${icon})` }} />
          </ButtonBase>
        ))}
      </Grid>
  }

  if (replyContent.replyType === REPLY_TYPES.PHOTO) {
    boxContent =
      <Grid container
            spacing={0}
            direction={"column"}
            alignItems="center"
            justify="center"
            style={{ height: "100%", overflowY: "hidden" }}
      >
        <img className="photoPreview" src={replyContent.message} alt="Sent message"/>
      </Grid>
  }

  if (replyContent.replyType === REPLY_TYPES.VOICE) {
    boxContent =
      <Grid container
            spacing={0}
            direction={"column"}
            alignItems="center"
            justify="center"
            style={{ height: "100%", overflowY: "hidden" }}
      >
        <Typography variant="h5" align={replyContent.message.length <= 50 ? "center" : "left"} >
          {replyContent.message}
        </Typography>
      </Grid>
  }
*/}

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setEnvelopeHidden(true);
    }, 4000);
    return () => window.clearTimeout(animationTimeout)
  }, []);


  return (

    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={ "Reply sent to " }
        boxContent={boxContent}
        buttonText={[buttonText.backToMessage, buttonText.inbox]}
        buttonActions={[
          () => history.push({pathname: '/startReply', state: currentPost }),
          () => history.push("/posts")
        ]}
        buttonIcons={[mailIcons.openEnvelope, mailIcons.closedEnvelope ]} />
    </>
  )
};

export default SentGrandparentReply;