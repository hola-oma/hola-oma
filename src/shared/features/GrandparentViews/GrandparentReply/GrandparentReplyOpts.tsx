import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Box } from '@material-ui/core';
import { Post } from "../../../models/post.model";
import { replyOptionIcons } from "../../../../Icons";
import GetEmojiReply from "./components/GetEmojiReply";
import GrandparentLayout from "../GrandparentLayout";

interface IGrandparentReplyOpts {
  post: Post;
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

  const [EmojiReplyOpen, setEmojiReplyOpen] = useState<boolean>(false);

  let history = useHistory();

  const returnToInbox = () => {
    console.log("Reply to " + post.from + " closed");
    history.push("/posts");
  }

  const returnToPost = () => {
    console.log("Reply to " + post.from + " closed");
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

  const boxContent = post.message + "\n\n" + post.photoURL;

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={boxContent}
          buttonText={["Return to Messages", "Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[returnToInbox, replyWithSmiley, replyWithVoiceMsg, replyWithPicture]}
          buttonIcons={[replyOptionIcons.closedEnvelope, replyOptionIcons.emoji,
                        replyOptionIcons.voicemail, replyOptionIcons.photo]}
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

        <GetEmojiReply
          isOpen={EmojiReplyOpen}
          returnToPost={returnToPost}
        />

     </>
    )
};

export default GrandparentReplyOpts;