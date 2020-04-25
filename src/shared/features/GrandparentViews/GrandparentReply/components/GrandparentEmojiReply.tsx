import React, {useContext, useState} from 'react';

import { Dialog } from "@material-ui/core";

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CakeIcon from '@material-ui/icons/Cake';
import MailIcon from '@material-ui/icons/Mail';
import HealingIcon from '@material-ui/icons/Healing';
import SendIcon from '@material-ui/icons/Send';

import GrandparentGrid from "../../GrandparentGrid";
import GrandparentLayout from "../../GrandparentLayout";
import {makeStyles} from "@material-ui/core/styles";

interface IEmojiReply {
  isOpen: boolean;
  returnToPost: () => void;
}

const GrandparentEmojiReply: React.FC<IEmojiReply> = ({isOpen, returnToPost}) => {

  //Resource: https://codesandbox.io/s/jj43l66r09
  let choicesList = () => {
    console.log("call choices list");
    let choicesList: Array<string> = [];
    choicesList.push("new click");
    choicesList.forEach(choice => console.log(choice));
  }


  return (
    <>
      <Dialog fullScreen
              open={isOpen}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">
      <GrandparentLayout
        headerText={"Replying to "}
        header2Text={"Choose which smileys to send!"}
        boxContent={<GrandparentGrid
          icons={[<InsertEmoticonIcon/>,
            <ThumbUpIcon/>,
            <SentimentVeryDissatisfiedIcon/>,
            <FavoriteIcon/>,
            <CakeIcon/>,
            <HealingIcon/>]}
          onClick={choicesList}
          choicesList={true}
        />}
          buttonText={["Go back to message", "Send Smiley(s)"]}
          buttonActions={ [returnToPost, () => console.log("send choices") ]}
          buttonIcons={[<MailIcon/>, <SendIcon/>]}
      />


      </Dialog>

    </>
  )
};

export default GrandparentEmojiReply;