import React, {useContext, useState} from 'react';

import {Box} from '@material-ui/core';
import {Post} from "../../../models/post.model";
import GrandparentEmojiReply from "./components/GrandparentEmojiReply";
import GrandparentLayout from "../GrandparentLayout";
import {GrandparentPostContext} from "../../../../App";

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

interface IGrandparentReplyOpts {
  post: Post;
}
const replyAnotherWay = () => {
  console.log("Grandparent wants to reply another way!");
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

  const FamilyPost = useContext(GrandparentPostContext).post;
  const [EmojiReplyOpen, setEmojiReplyOpen] = useState<boolean>(false);

  const returnToPost = () => {
    console.log("Reply " + FamilyPost.from + " closed");
    setEmojiReplyOpen(false);
  }

  const replyWithSmiley = () => {
    console.log("Grandparent wants to send an emoji!");
    setEmojiReplyOpen(true);
  }

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={FamilyPost.message}
          buttonText={["Smiley", "Other Options Pending"]}
          buttonActions={[replyWithSmiley, replyAnotherWay]}
          buttonIcons={[<InsertEmoticonIcon/>, <ContactSupportIcon/>]}
          />

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Create component for reply options:</li>
                  <ul>Send Emoji(s)</ul>
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