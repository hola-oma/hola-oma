import React from 'react';

import {Dialog} from '@material-ui/core';

import {Post} from "../../../../models/post.model";
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../../GrandparentLayout";

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, replyToMessage, returnToInbox}) => {

  // todo: add Card (?) to display photo
  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
      <Dialog fullScreen
              open={isOpen}
              onClose={returnToInbox}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">

      <GrandparentLayout
        post={currentPost}
        headerText={"Letter from "}
        buttonText={["Go Back to All Messages", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon />, <CreateIcon />]}
      />
      </Dialog>

  );
}

export default CurrentMsgModal;
