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
          headerText={"Letter from "}
          header2Text={"Choose how to reply below!"}
          boxContent={
            <GrandparentPostLayout
              from={currentPost.from}
              imageURL={currentPost.photoURL}
              message={currentPost.message}
            />
          }
          buttonText={["Smiley", "Voice Message", "Your Picture"]}
          buttonActions={[
            () => history.push( {pathname: '/emoji', state: currentPost } ),
            () => console.log("Grandparent wants to send a voicemail!"),
            () => history.push( {pathname: '/photo', state: currentPost } ),
          ]}
          buttonIcons={[replyOptionIcons.emoji, replyOptionIcons.voicemail, replyOptionIcons.photo]}
          />

     </>
    )
};

export default GrandparentReplyOpts;