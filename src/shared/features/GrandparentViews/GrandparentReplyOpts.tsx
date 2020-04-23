import React  from 'react';

import {Box, Card, CardContent, Button, SvgIconProps} from '@material-ui/core';
import {Post} from "../../models/post.model";
import GrandparentLayout from "./GrandparentLayout";

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

interface IGrandparentReplyOpts {
  post: Post;
}

const replyWithSmiley = () => {
  console.log("Grandparent wants to send an emoji!");
}

const replyAnotherWay = () => {
  console.log("Grandparent wants to reply another way!");
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

    return (
        <>

        <GrandparentLayout
          post={post}
          headerText={"Reply to Letter from "}
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
            </ul>
        </Box>
     </>
    )
};

export default GrandparentReplyOpts;