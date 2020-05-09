import React from 'react';
import { useLocation, useHistory } from "react-router-dom";

import { GrandparentPostLayout } from "../Components/GrandparentPostLayout";
import { replyOptionIcons } from "../../../../Icons";
import GrandparentLayout from "../Components/GrandparentLayout";

const GrandparentReplyOpts: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  return (
        <>

        <GrandparentLayout
          from={currentPost.from}
          headerText={"Reply to Letter from "}
          boxContent={<GrandparentPostLayout/>}
          buttonText={["Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[
            () => history.push({pathname: '/emoji', state: currentPost } ),
            () => console.log("Grandparent wants to send a \"voicemail\"!"),
            () => console.log("Grandparent wants to send a picture!")
          ]}
          buttonIcons={[replyOptionIcons.emoji, replyOptionIcons.voicemail, replyOptionIcons.photo]}
          />

     </>
    )
};

export default GrandparentReplyOpts;