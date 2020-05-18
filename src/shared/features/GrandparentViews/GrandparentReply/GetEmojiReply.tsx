import React, {useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router'

import { ButtonBase,  Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../services/reply";

import { REPLY_TYPES } from "../../../models/reply.model";
import { getUserProfile } from "../../../../services/user";
import { replyEmojiArray, mailIcons } from "../../../../Icons";

let choicesList: Array<number> = [];

const GetEmojiReply: React.FC = () => {

  // Adapted from: https://material-ui.com/components/buttons/
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
      image: {
        position: 'relative',
      },
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
      highlight: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      },
      noHighlight: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        color: 'black',
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      },
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
  }, [currentPost]);

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
      {currentPost &&
        <GrandparentLayout
            from={currentPost.from}
            headerText={"Replying to "}
            header2Text={"Choose which smileys to send!"}
            alertText={getAlertText()}
            boxContent={
              <Grid container>
                {emojiIcons.map((icon, index: number) => (
                  <ButtonBase
                    className={classes.image}
                    style={{width: '33%'}}
                    onClick={() => getChoices(index)} >
                    <span className={classes.imageSrc} style={{backgroundImage: `url(${icon})` }} />
                    <span className={highlightedList[index] ? classes.highlight : classes.noHighlight} />
                  </ButtonBase>
                ))}
              </Grid>
            }
            buttonText={[buttonText.replyOptions, buttonText.send]}
            buttonActions={[
              () => history.goBack(),
              e => buildReply(e) ] }
            buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]}
        />
      }
    </>
  )
};

export default GetEmojiReply;