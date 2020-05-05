import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { GrandparentPostView } from "../GrandparentPostView";
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

  return (
        <>

        <GrandparentLayout
          headerText={"Reply to Letter from "}
          boxContent={GrandparentPostView}
          buttonText={["Return to Messages", "Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[
            () => history.push("/posts"),
            () => setEmojiReplyOpen(true),
            () => console.log("Grandparent wants to send a \"voicemail\"!"),
            () => console.log("Grandparent wants to send a picture!")
          ]}
          buttonIcons={[replyOptionIcons.closedEnvelope, replyOptionIcons.emoji,
                        replyOptionIcons.voicemail, replyOptionIcons.photo]}
          />

        <GetEmojiReply
          isOpen={EmojiReplyOpen}
          returnToPost={() => setEmojiReplyOpen(false)}
        />

     </>
    )
};

export default GrandparentReplyOpts;