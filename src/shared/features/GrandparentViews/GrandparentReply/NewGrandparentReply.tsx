import React from 'react';

import { useLocation, useHistory } from "react-router";

import { mailIcons, replyEmojiArray } from "../../../../Icons";
import GrandparentLayout from "../Components/GrandparentLayout";
import {Card, CardContent, Grid, SvgIconProps} from "@material-ui/core";

export const NewGrandparentReply: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  const sentEmojis: Array<React.ReactElement<SvgIconProps>> = [];
  const allEmojis: Array<React.ReactElement<SvgIconProps>> = replyEmojiArray();
  currentPost.message.forEach(function(index: number) {
    sentEmojis.push(allEmojis[index]);
  })

  return (
    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={ "Reply sent to " }
        boxContent={
          <Grid container>
            {
              sentEmojis.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
                return (
                  <Grid item xs={6}
                        className={"inboxCard"}
                        key={index}>
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
        buttonText={["Go back to letter", "Close letter"]}
        buttonActions={ [() => console.log("todo: return to Inbox with modal opened"),
                        () => history.push("/posts")] }
        buttonIcons={[mailIcons.openEnvelope, mailIcons.closedEnvelope ]} />
    </>
  )
};

export default NewGrandparentReply;