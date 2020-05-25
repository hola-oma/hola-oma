import React from 'react';
import uuid from 'react-uuid';

import { useLocation, useHistory } from "react-router";

import {mailIcons, replyEmojiPNGs} from "../../../../Icons";
import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import {ButtonBase, Grid, SvgIconProps, Typography} from "@material-ui/core";
import {Post} from "../../../models/post.model";
import { REPLY_TYPES } from "../../../models/reply.model";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 40%',
    },
    image: {
      position: 'relative',
    }
  }),
);

export const SentGrandparentReply: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const state: any = location.state;

  const replyContent = state.replyContent;
  const currentPost: Post = state.currentPost;
  let boxContent: any = {}

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
        <img src={replyContent.message} alt="Sent message"/>
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