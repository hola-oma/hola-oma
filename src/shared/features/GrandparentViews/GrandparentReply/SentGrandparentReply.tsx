import React from 'react';

import { useLocation, useHistory } from "react-router";

import { mailIcons, replyEmojiArray } from "../../../../Icons";
import GrandparentLayout from "../Components/GrandparentLayout";
import {Card, CardContent, Grid, SvgIconProps} from "@material-ui/core";
import {Post} from "../../../models/post.model";
import { REPLY_TYPES } from "../../../models/reply.model";

export const SentGrandparentReply: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const state: any = location.state;

  const replyContent = state.replyContent;
  const currentPost: Post = state.currentPost;

  let boxContent: any = {}

  if (replyContent.replyType === REPLY_TYPES.EMOJI) {
    const sentEmojis: Array<React.ReactElement<SvgIconProps>> = [];
    const allEmojis: Array<React.ReactElement<SvgIconProps>> = replyEmojiArray();
    (replyContent.message).forEach(function(index: number) {
      sentEmojis.push(allEmojis[index]);
    })

    boxContent =
      <Grid container>
      {
        sentEmojis.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
          return (
            <Grid item xs={6}
                  className={"inboxCard"}
                  key={currentPost.pid}>
              <Card>
                <CardContent>
                  {icon}
                </CardContent>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  }

  if (replyContent.replyType === REPLY_TYPES.PHOTO) {
    boxContent = <img src={replyContent.message} alt="Sent message"/>;
  }

  if (replyContent.replyType === REPLY_TYPES.VOICE) {
    boxContent = replyContent.message;
  }


  return (
    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={ "Reply sent to " }
        boxContent={boxContent}
        buttonText={["Go back to letter", "Close letter"]}
        buttonActions={[
          () => history.push({pathname: '/startReply', state: currentPost }),
          () => history.push("/posts")
        ]}
        buttonIcons={[mailIcons.openEnvelope, mailIcons.closedEnvelope ]} />
    </>
  )
};

export default SentGrandparentReply;