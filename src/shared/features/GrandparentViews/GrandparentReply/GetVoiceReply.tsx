import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'

import {TextareaAutosize} from "@material-ui/core";

import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { Reply, REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { mailIcons } from "../../../../Icons";

import './GrandparentReply.css';
import FormError from 'shared/components/FormError/FormError';
import RecordButton from '../Components/RecordButton/RecordButton';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';
import Column from 'shared/components/Column/Column';

import { isIOS, isSafari } from 'react-device-detect';

const GetVoiceReply: React.FC = () => {

  const MAX_REPLY_LENGTH = 400;
  const NEAR_MAX_REPLY_LENGTH = MAX_REPLY_LENGTH - 30;
  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [alertOn, setAlert] =  useState<boolean>(false);
  const [supportedMessage, setSupportedMessage] = useState("");
  const [supportedDeviceBrowser, setSupportedDeviceBrowser] = useState<boolean>(false);

  const [completeReply, setCompleteReply] = useState("");
  const [dictatedReply, setDictatedReply] = useState("");

  const [lowConfidence, setLowConfidence] = useState(false);

  const [replyLength, setReplyLength] = useState(0);

  const [replyNearlyTooLong, setReplyNearlyTooLong] = useState(false);
  const [replyTooLong, setReplyTooLong] = useState(false);

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

  // fires every time completeReply is updated
  useEffect(() => {
    // update character count
    setReplyLength(completeReply.length);

    // check if we're nearing the max length or already past it  

    if (completeReply.length > MAX_REPLY_LENGTH) {
      setReplyTooLong(true);
      setReplyNearlyTooLong(false);
    } else if (completeReply.length > NEAR_MAX_REPLY_LENGTH) {
      setReplyNearlyTooLong(true);
    }

    // check if we're below the max length after having been at/above it 
    if (replyTooLong) {
      if (completeReply.length <= MAX_REPLY_LENGTH) {
        setReplyTooLong(false);
      }
    }

    if (replyNearlyTooLong) {
      if (completeReply.length <= NEAR_MAX_REPLY_LENGTH) {
        setReplyNearlyTooLong(false);
      }
    }

  }, [MAX_REPLY_LENGTH, NEAR_MAX_REPLY_LENGTH, completeReply, replyNearlyTooLong, replyTooLong]);

  // see if the user's device and browser combo supports microphone usage 
  useEffect(() => {
    if (isIOS && !isSafari) {
      setSupportedMessage("iPad and iPhone users must use Safari to access microphone features.");
      setSupportedDeviceBrowser(false);
    } else {
      setSupportedDeviceBrowser(true);
    }
  }, [])

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

    if ((results && confidence > 0.40) || (results && !confidence)) {
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

  const handleError = (e: any) => {
    setInProgress(false);
  }

  const buildReply = (e: any) => {
    if (dictatedReply.length < 1) { setAlert(true); return; }
    else {
      setAlert(false);
      const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.VOICE,
                                  dictatedReply, currentPost.pid, currentPost.creatorID);
      submitReply(e, replyContent)
        .then( () => { history.push({
          pathname: "/sentReply",
          state: {
            replyContent: replyContent,
            currentPost: currentPost  }
        });
      });
    }
  }

  const charsRemaining = () => {
    let remaining = MAX_REPLY_LENGTH - replyLength;
    if (remaining > 0) {
      return remaining;
    } else if (remaining <= 0) {
      return 0;
    }
  }

  const charsOver = () => {
    return Math.abs(MAX_REPLY_LENGTH - replyLength);
  }

  return (
    <>
      { currentPost &&
        <GrandparentLayout
          from={currentPost.from}
          headerText={"Replying to "}
          header2Text={"Press 'RECORD' to dictate a short message"}
          alertText={getAlertText()}
          boxContent={
            <>
            { supportedDeviceBrowser &&
              <Row style={{overflowY: 'scroll'}} alignItems="flex-start" justify="center">
                <Child xs={12}>
                  <Column>
                    <Child>
                    <RecordButton
                      handleDictationDone={handleDictationDone}
                      handleProgress={handleProgress}
                      handleError={handleError}
                    />

                    <span className="listenError">
                        {lowConfidence &&
                        <Row justify="center">
                            <Child xs={11}>
                                <FormError error={"Sorry, I didn't catch that. Please record again."}/>
                            </Child>
                        </Row>
                        }

                      {replyNearlyTooLong &&
                      <Row justify="center">
                          <Child xs={11}>
                              <FormError error={`Approaching character limit! ${MAX_REPLY_LENGTH} allowed (${charsRemaining()} remaining)`} severity="warning"/>
                          </Child>
                      </Row>
                      }

                        {replyTooLong &&
                        <Row justify="center">
                            <Child xs={11}>
                                <FormError error={`Maximum ${MAX_REPLY_LENGTH} characters (${charsOver()} over)`}/>
                            </Child>
                        </Row>
                        }
                        </span>

                        <Row justify="center">
                          <Child xs={11}>
                            <TextareaAutosize
                              className={`grandparentReplyText thinBorder ${inProgress ? 'inProgressText' : ''}`}
                              rowsMin={8}
                              rowsMax={8}
                              aria-label="voice reply"
                              placeholder="Your voice message appears here"
                              value={inProgress ? dictatedReply : completeReply}
                              onChange={handleTextareaChange}
                            />
                          </Child>

                        </Row>
                      </Child>
                    </Column>
                  </Child>
                </Row>
              }

              {!supportedDeviceBrowser && 
                <p>{supportedMessage}</p>
              }

            </>
          }
          buttonText={[buttonText.replyOptions, buttonText.send]}
          buttonActions={[
            () => history.goBack(),
            e => buildReply(e) ] }
          buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]}
          buttonDisabled={[false,(replyTooLong || !completeReply.trim())]} />

      }
    </>
  )
};

export default GetVoiceReply;
