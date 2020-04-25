import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import {Box} from '@material-ui/core';
import {Post} from "../../../models/post.model";
import GrandparentEmojiReply from "./components/GrandparentEmojiReply";
import GrandparentLayout from "../GrandparentLayout";
import {GrandparentPostContext} from "../../../../App";

import MailIcon from '@material-ui/icons/Mail';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

interface IGrandparentReplyOpts {
  post: Post;
}
const replyAnotherWay = () => {
  console.log("Grandparent wants to reply another way!");
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

  const FamilyPost = useContext(GrandparentPostContext).post;
  const [EmojiReplyOpen, setEmojiReplyOpen] = useState<boolean>(false);

  let history = useHistory();

  const returnToInbox = () => {
    console.log("Reply to " + FamilyPost.from + " closed");
    history.push("/posts");
  }

  const returnToPost = () => {
    console.log("Reply to " + FamilyPost.from + " closed");
    setEmojiReplyOpen(false);
  }

  const replyWithSmiley = () => {
    console.log("Grandparent wants to send an emoji!");
    setEmojiReplyOpen(true);
  }

  const replyWithVoiceMsg = () => {
    console.log("Grandparent wants to send a \"voicemail\"!");
  }

  const replyWithPicture = () => {
    console.log("Grandparent wants to send a picture!");
  }

  const boxContent = FamilyPost.message + "\n\n" + FamilyPost.photoURL;

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={boxContent}
          buttonText={["Return to Messages", "Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[returnToInbox, replyWithSmiley, replyWithVoiceMsg, replyWithPicture]}
          buttonIcons={[<MailIcon/>, <InsertEmoticonIcon/>, <PermPhoneMsgIcon/>, <PhotoCameraIcon/>]}
          />

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
              <li>Fix Box size</li>
              <li>Create replies:</li>
                <ul>Send Emoji</ul>
                <ul>Send "Voice Message"</ul>
                <ul>Send Selfie</ul>
              <li>"Sent reply" View</li>
              <li>Return to Post (requires return to Inbox + open modal</li>
            </ul>
        </Box>

        <GrandparentEmojiReply
          isOpen={EmojiReplyOpen}
          returnToPost={returnToPost}
        />

     </>
    )
};

export default GrandparentReplyOpts;