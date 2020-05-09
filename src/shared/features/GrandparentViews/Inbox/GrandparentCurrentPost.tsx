import React from 'react';
import { useLocation, useHistory } from "react-router-dom";

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../Components/GrandparentLayout";
import { GrandparentPostLayout } from "../Components/GrandparentPostLayout";


const GrandparentCurrentPost: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  return (
      <GrandparentLayout
        from={currentPost.from}
        headerText={"Letter from "}
        boxContent={
          <GrandparentPostLayout
            from={currentPost.from}
            imageURL={currentPost.photoURL}
            message={currentPost.message}
          />
        }
        buttonText={["Go Back to Mailbox", "Reply"]}
        buttonActions={[
          () => history.goBack(),
          () => history.push({pathname: "/newPost", state: currentPost})]}
        buttonIcons={[<MailIcon/>, <CreateIcon/>]}
      />
  );
}

export default GrandparentCurrentPost;
