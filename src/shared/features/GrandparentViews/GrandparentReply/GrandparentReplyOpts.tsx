import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import {Box} from '@material-ui/core';
import {Post} from "../../../models/post.model";
import GrandparentEmojiReply from "./components/GrandparentEmojiReply";
import GrandparentLayout from "../GrandparentLayout";
import {GrandparentPostContext} from "../../../../App";

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import MailIcon from '@material-ui/icons/Mail';

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

  const boxContent = FamilyPost.message + "\n\n" + FamilyPost.photoURL;

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={boxContent}
          buttonText={["Return to Messages", "Smiley", "Other Options Pending"]}
          buttonActions={[returnToInbox, replyWithSmiley, replyAnotherWay]}
          buttonIcons={[<MailIcon/>, <InsertEmoticonIcon/>, <ContactSupportIcon/>]}
          />

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
              <li>Figure out why Box isn't same size</li>
              <li>Create button and component for reply options:</li>
                <ul>Send "Voice Message"</ul>
                <ul>Send Selfie</ul>
              <li>"Sent reply" View</li>
              <li>"Return to Post"</li>
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