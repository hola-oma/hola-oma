import React from 'react';
import { useLocation, useHistory } from "react-router-dom";

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../GrandparentLayout";
import { GrandparentPostLayout } from "../GrandparentPostLayout";


const GrandparentCurrentPost: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const currentReply: any = location.state;

  const returnToInbox = () => {
    history.goBack();
  }

  const replyToMessage = () => {
    history.push({pathname: "/newPost", state: currentReply});
  }

  return (
      <GrandparentLayout
        headerText={"Letter from "}
        boxContent={ <GrandparentPostLayout/> }
        buttonText={["Go Back to Mailbox", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon/>, <CreateIcon/>]}
      />
  );
}

export default GrandparentCurrentPost;
