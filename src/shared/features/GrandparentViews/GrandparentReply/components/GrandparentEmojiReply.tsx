import React, {useState} from 'react';
import { useHistory } from "react-router";

import {Button, Card, CardContent, Dialog, Grid, SvgIconProps} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CakeIcon from '@material-ui/icons/Cake';
import MailIcon from '@material-ui/icons/Mail';
import HealingIcon from '@material-ui/icons/Healing';
import SendIcon from '@material-ui/icons/Send';

import GrandparentLayout from "../../GrandparentLayout";
import NewGrandparentReply from "../NewGrandparentReply";
import {Reply} from "../../../../models/reply.model";
import {createReply, updateReplyID} from "../../../../../services/reply";

interface IEmojiReply {
  isOpen: boolean;
  returnToPost: () => void;
}

let choicesList: Array<number> = [];

const GrandparentEmojiReply: React.FC<IEmojiReply> = ({isOpen, returnToPost}) => {

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

  const [alertOn, setAlert] =  useState<boolean>(false);
  const [highlightedList, setHighlighted] = useState<Array<boolean>>([false, false, false, false, false, false]);
  const handleHighlight = (index: number) => {
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    let copy = [...highlightedList];
    copy[index] = ( !copy[index] );   // Change to opposite value
    setHighlighted(copy);
  }
  const history = useHistory();

  // Function called on click
  const getChoices = (choice: number) => {
    // Highlight or un-highlight
    handleHighlight(choice);

    // Add or remove clicked icon from array
    let position = choicesList.indexOf(choice);
    (position < 0) ? choicesList.push(choice) : choicesList.splice(position, 1);

    // For testing - delete later
    console.log("current choices array: ");
    choicesList.forEach(choice => console.log(choice));
  }

  const getAlertText = () => {
    return alertOn ? "Must select at least one emoji to reply" : null;
  }
    
  const createReplyFromChoices = (choices: Array<number>) => {
    if (choices.length < 1 ) { setAlert(true); return; }

    else {
      setAlert(false);
      const replyContent: any = {"value": "content"};
      // history.push("/newReply");
    }

    const submitReply = async (e: any) => {
      e.preventDefault();

      let reply: Reply = {
        rid: "abc123",
        creatorID: userId,
        date: new Date().getTime(),
        from: displayName,
        read: false,
        message: ["not a real reply", "just testing"],
        responseTo: "put post id here",
        receiverID: "put the real one in later"
      };

      try {
        console.log("sending reply");
        const replySent = await createReply(reply);
        if (replySent) {
          console.log("success sending reply!");
          await updateReplyID(replySent);       // Add post id to new post document
        }
      } catch(e) {
        console.error(e.message);
      }
    };
  }

  const replyOptions: Array<React.ReactElement<SvgIconProps>> = [
    <InsertEmoticonIcon/>,
    <ThumbUpIcon/>,
    <SentimentVeryDissatisfiedIcon/>,
    <FavoriteIcon/>,
    <CakeIcon/>,
    <HealingIcon/> ]

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
            replyOptions.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
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
          buttonActions={ [returnToPost, () => createReplyFromChoices(choicesList) ]}
          buttonIcons={[<MailIcon/>, <SendIcon/>]}
      />


      </Dialog>

    </>
  )
};

export default GrandparentEmojiReply;