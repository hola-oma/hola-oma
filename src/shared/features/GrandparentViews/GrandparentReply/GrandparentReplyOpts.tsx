import React, { useState } from 'react';

import { GrandparentPostLayout } from "../GrandparentPostLayout";
import { Post } from "../../../models/post.model";
import { replyOptionIcons } from "../../../../Icons";
import GetEmojiReply from "./components/GetEmojiReply";
import GrandparentLayout from "../GrandparentLayout";


interface IGrandparentReplyOpts {
  post: Post;
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

  const [EmojiReplyOpen, setEmojiReplyOpen] = useState<boolean>(false);

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={<GrandparentPostLayout/>}
          buttonText={["Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[
            () => setEmojiReplyOpen(true),
            () => console.log("Grandparent wants to send a \"voicemail\"!"),
            () => console.log("Grandparent wants to send a picture!")
          ]}
          buttonIcons={[replyOptionIcons.emoji, replyOptionIcons.voicemail, replyOptionIcons.photo]}
          />

        <GetEmojiReply
          isOpen={EmojiReplyOpen}
          returnToPost={() => setEmojiReplyOpen(false)}
        />

     </>
    )
};

export default GrandparentReplyOpts;