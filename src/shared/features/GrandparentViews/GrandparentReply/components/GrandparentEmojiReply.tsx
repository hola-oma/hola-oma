import React, {useContext} from 'react';

import {Post} from "../../../../models/post.model";

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

interface IEmojiReply {
  isOpen: boolean;
  returnToPost: () => void;
}

const GrandparentEmojiReply: React.FC<IEmojiReply> = ({isOpen, returnToPost}) => {

  return (
    <>
      <Dialog fullScreen
              open={isOpen}
              // onClose={ () => console.log("add return to post function")}
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
        />}
          buttonText={["Go back to message", "Send Smiley(s)"]}
          buttonActions={[returnToPost, () => console.log("Create reply")]}
          buttonIcons={[<MailIcon/>, <SendIcon/>]}
      />


      </Dialog>

    </>
  )
};

export default GrandparentEmojiReply;