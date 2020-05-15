import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'
import key from 'weak-key';

import { Button, Card, CardContent, Grid, SvgIconProps } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import GrandparentLayout from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { replyEmojiArray, mailIcons } from "../../../../Icons";

let choicesList: Array<number> = [];

const GetEmojiReply: React.FC = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing(5),
      },
      highlighted: {
        backgroundColor: 'gray'
      }
    }),
  );

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const emojiIcons = replyEmojiArray();
  const currentPost: any = location.state;

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [highlightedList, setHighlighted] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const [alertOn, setAlert] =  useState<boolean>(false);

  const clearChoices = () => {
    choicesList = [];
  }

  const handleHighlight = (index: number) => {
    let copy = [...highlightedList];
    copy[index] = ( !copy[index] );   // Change to opposite value
    setHighlighted(copy);
  }

  const getAlertText = () => {
    return alertOn ? "Must select at least one emoji to reply" : null;
  }

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        setDisplayName(userProfile.displayName);
        setUserId(userProfile?.uid);
      });
    // This does not do anything on Rebecca's setup if try to navigate directly to route
    console.log(currentPost);
    if (currentPost === undefined) {
      history.push("/posts");
    }
  });

  const getChoices = (choice: number) => {
    handleHighlight(choice);
    let position = choicesList.indexOf(choice);   // Find clicked icon's array position
    (position < 0) ? choicesList.push(choice) : choicesList.splice(position, 1); // Adjust array
  }

  const buildReply = (e: any) => {
    if (choicesList.length < 1) { setAlert(true); return; }
    else {
      setAlert(false);
      const replyContent = setReplyContent(userId, displayName, REPLY_TYPES.EMOJI,
        choicesList, currentPost.pid, currentPost.creatorID);
      submitReply(e, replyContent)
        .then( () => {
          clearChoices();
          history.push({
            pathname: "/sentReply",
            state: {
              replyContent: replyContent,
              currentPost: currentPost  }
          });
      })
    }
  }

  return (
    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={"Replying to "}
        header2Text={"Choose which smileys to send!"}
        alertText={getAlertText()}
        boxContent={
          <Grid container>
          {
            emojiIcons.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <Grid item xs={4}
                  className={"inboxCard"}
                  key={key(icon)}>
                  <Card>
                    <CardContent onClick={() => getChoices(index)}
                                 className={ highlightedList[index] ? classes.highlighted : classes.root }>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        {icon}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
        }
          buttonText={["Go back to Reply Options", "Send Smiley(s)"]}
          buttonActions={[
            () => history.goBack(),
            e => buildReply(e) ] }
          buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]} />
    </>
  )
};

export default GetEmojiReply;