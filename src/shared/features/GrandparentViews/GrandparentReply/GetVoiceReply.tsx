import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'

import {Box, Grid, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import GrandparentLayout from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { Reply, REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { mailIcons } from "../../../../Icons";

let choicesList: Array<number> = [];

const GetVoiceReply: React.FC = () => {

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
  const currentPost: any = location.state;

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [highlightedList, setHighlighted] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const [alertOn, setAlert] =  useState<boolean>(false);

  const handleHighlight = (index: number) => {
    let copy = [...highlightedList];
    copy[index] = ( !copy[index] );   // Change to opposite value
    setHighlighted(copy);
  }

  const getAlertText = () => {
    return alertOn ? "Must create a message to send" : null;
  }

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        setDisplayName(userProfile.displayName);
        setUserId(userProfile?.uid);
      });
  }, []);

  const handleDictationDone = (results: any) => {
    const { confidence, transcript } = results.result;
    console.log("Dictation is complete, here is the result:");
    if (results) {
      console.log(transcript + " " + confidence);
      // todo: set a react variable with the results 
    }
  }

  const buildReply = (e: any, choicesIndexes: Array<number>) => {
    if (choicesIndexes.length < 1) { setAlert(true); return; }
    else {
      setAlert(false);
      const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.EMOJI,
                                  choicesIndexes, currentPost.pid, currentPost.creatorID);
      submitReply(e, replyContent)
        .then( () => { history.push({
          pathname: "/newReply",
          state: {
            replyContent: replyContent,
            currentPost: currentPost  }
        });
        });
    }
  }

  return (
    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={"Replying to "}
        header2Text={"Press [record] and talk"}
        recordButton={true}
        handleDictationDone={handleDictationDone}
        alertText={getAlertText()}
        boxContent={
          <Grid container>
            <TextField value="test"/>
          </Grid>
        }
          buttonText={["Go back to Reply Options", "Send reply"]}
          buttonActions={[
            () => history.goBack(),
            e => buildReply(e, choicesList) ] }
          buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]} />

        <Box className="todo">
          <h3>To do items:</h3>
          <ul>
            <li>Keyboard access to edit reply?</li>
          </ul>
        </Box>
    </>
  )
};

export default GetVoiceReply;