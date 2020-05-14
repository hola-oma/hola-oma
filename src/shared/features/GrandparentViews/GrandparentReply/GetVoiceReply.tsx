import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'

import {Box, Grid, TextareaAutosize} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import GrandparentLayout from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { Reply, REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { mailIcons } from "../../../../Icons";

import './GrandparentReply.css';
import FormError from 'shared/components/FormError/FormError';
import RecordButton from '../Components/RecordButton/RecordButton';
import Row from 'shared/components/Row/Row';

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

  const [completeReply, setCompleteReply] = useState("");
  const [dictatedReply, setDictatedReply] = useState("");

  const [lowConfidence, setLowConfidence] = useState(false);
  const [inProgress, setInProgress] = useState(false);

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

  // fires after completeReply is updated to update what's in the text area
  useEffect(() => {
    setDictatedReply(completeReply);
  }, [completeReply]);

  const handleTextareaChange = (event: any) => {
    setCompleteReply(event.target.value);
    setDictatedReply(event.target.value);
  }

  const handleProgress = (results: any) => {
    setInProgress(true);
    setLowConfidence(false);

    if (!results.results || results.results.length === 0) {
      setDictatedReply(completeReply + "...");
    } else if (results.results.length > 0) {
      const { confidence, transcript } = results.results[0];
      if (confidence < 0.40) {
        setDictatedReply(completeReply + " ...");
      } else {
        setDictatedReply((completeReply + " " + transcript).trim());
      }
    }
  }

  const handleDictationDone = (results: any) => {
    setInProgress(false);
    const { confidence, transcript } = results.result;

    if (results && confidence > 0.40 || results && !confidence) {
      setLowConfidence(false);
      if (completeReply.length > 0) {
        setDictatedReply(completeReply + " " + transcript);
        setCompleteReply(completeReply + " " + transcript);
      } else {
        setDictatedReply(transcript);
        setCompleteReply(transcript);
      }
    } else {
      setDictatedReply(completeReply);
      setLowConfidence(true);
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
        alertText={getAlertText()}
        boxContent={
          <Grid container>
            <Row alignItems="center" justify="center">
              <RecordButton 
                handleDictationDone={handleDictationDone} 
                handleProgress={handleProgress}
              />


              {lowConfidence && 
                <FormError error={"Sorry, I didn't catch that. Please record again."}/>
              }

              <TextareaAutosize
                className={`grandparentReplyText ${inProgress ? 'inProgressText' : ''}`}
                rowsMin={8}
                aria-label="voice reply"
                placeholder="Your voice message appears here"
                value={inProgress ? dictatedReply : completeReply}
                onChange={handleTextareaChange}
              />
            </Row>
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
            <li>Max length on recording</li>
          </ul>
        </Box>
    </>
  )
};

export default GetVoiceReply;