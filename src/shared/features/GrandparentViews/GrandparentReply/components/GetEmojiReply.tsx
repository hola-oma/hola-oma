import React, {useContext, useEffect, useState} from 'react';
import { useHistory} from 'react-router'

import {Button, Card, CardContent, Dialog, Grid, SvgIconProps} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import GrandparentLayout from "../../GrandparentLayout";
import { setReplyContent, submitReply } from "../../../../../services/reply";

import { Reply, REPLY_TYPES } from "../../../../models/reply.model";
import { getUserProfile } from "../../../../../services/user";
import { replyEmojiArray, mailIcons } from "../../../../../Icons";
import { GrandparentPostContext } from "../../../../../App";

interface IEmojiReply {
  isOpen: boolean;
  returnToPost: () => void;
}

let choicesList: Array<number> = [];

const GetEmojiReply: React.FC<IEmojiReply> = ({isOpen, returnToPost}) => {

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
  const FamilyPost = useContext(GrandparentPostContext).post;
  const emojiIcons = replyEmojiArray();

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [highlightedList, setHighlighted] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const [alertOn, setAlert] =  useState<boolean>(false);

  const handleHighlight = (index: number) => {
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
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
  }, []);

  const getChoices = (choice: number) => {
    handleHighlight(choice);
    let position = choicesList.indexOf(choice);   // Find clicked icon's array position
    (position < 0) ? choicesList.push(choice) : choicesList.splice(position, 1); // Adjust array
  }

  const buildReply = (e: any, choicesIndexes: Array<number>) => {
    if (choicesIndexes.length < 1) { setAlert(true); return; }
    else {
      setAlert(false);
      const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.EMOJI,
                                  choicesIndexes, FamilyPost.from, FamilyPost.creatorID);
      submitReply(e, replyContent).then( () => {
            history.push({pathname: "/newReply",  state: replyContent});
          }
        );
      }
    }

  // @ts-ignore
  return (
    <>
      <Dialog fullScreen
              open={isOpen}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
      <GrandparentLayout
        headerText={"Replying to "}
        header2Text={"Choose which smileys to send!"}
        alertText={getAlertText()}
        boxContent={<Grid container>
          {
            emojiIcons.map( (icon: any, index: number) => {
              return (
                <Grid item xs={4}
                  className={"inboxCard"}
                  key={index}>
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
        </Grid>}
          buttonText={["Go back to Reply Options", "Send Smiley(s)"]}
          buttonActions={ [returnToPost, e => buildReply(e, choicesList) ] }
          buttonIcons={[ mailIcons.closedEnvelope, mailIcons.paperAirplane ]}
      />


      </Dialog>

    </>
  )
};

export default GetEmojiReply;