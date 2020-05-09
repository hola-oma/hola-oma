import React from 'react';
import { useHistory } from "react-router-dom";

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../GrandparentLayout";
import {GrandparentPostLayout} from "../GrandparentPostLayout";


const GrandparentCurrentPost: React.FC = () => {

  let history = useHistory();

  const returnToInbox = () => {
    history.goBack();
  }

  const replyToMessage = () => {
    history.push("/newPost");
  }

  return (
      <GrandparentLayout
        headerText={"Letter from "}
        boxContent={ <GrandparentPostLayout/> }
        buttonText={["Go Back to All Messages", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon/>, <CreateIcon/>]}
      />
  );
}

export default GrandparentCurrentPost;
