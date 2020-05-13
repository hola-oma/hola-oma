import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'

import {Box, Grid, TextField, TextareaAutosize} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import GrandparentLayout from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { Reply, REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { mailIcons } from "../../../../Icons";

import './GrandparentReply.css';

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
  const [alertOn, setAlert] =  useState<boolean>(false);
  const [dictatedReply, setDictatedReply] = useState("");

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
    console.log(results);
    if (results) {
      // todo: if confidence is too low, we could ask them to record again 
      // for now it just uses whatever you recorded
      setDictatedReply(transcript);
    }
  }

  const buildReply = (e: any) => {
    if (dictatedReply.length < 1) { setAlert(true); return; }
    else {
      setAlert(false);
      const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.VOICE,
                                  dictatedReply, currentPost.pid, currentPost.creatorID);
      submitReply(e, replyContent)
        .then( () => { history.push({
          pathname: "/posts",
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
        header2Text={"Press 'RECORD' to dictate a short message"}
        recordButton={true}
        handleDictationDone={handleDictationDone}
        alertText={getAlertText()}
        boxContent={
          <Grid container>
            <TextareaAutosize
              className="grandparentReplyText"
              rowsMin={8}
              aria-label="voice reply"
              placeholder="Your message appears here"
              defaultValue={dictatedReply}
            />
          </Grid>
        }
          buttonText={["Go back to Reply Options", "Send reply"]}
          buttonActions={[
            () => history.goBack(),
            e => buildReply(e) ] }
          buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]} />

        <Box className="todo">
          <h3>To do items:</h3>
          <ul>
            <li>Grey out the "Start recording" button while actively recording</li>
            <li>Make it obvious when it's actively recording</li>
            <li>Add message to the textfield in pieces as it is constructed?</li>
            <li>Low confidence = prompt user to re-record</li>
            <li>Max length on recording</li>
          </ul>
        </Box>
    </>
  )
};

export default GetVoiceReply;