import React from 'react';
import {Dialog} from '@material-ui/core';

import {Post} from "../../../../models/post.model";
import GrandparentLayout from "../../GrandparentLayout";

interface ICurrentMsgModal {
  isOpen: boolean;
  currentPost: Post;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , currentPost, replyToMessage, returnToInbox}) => {

  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
      <Dialog fullScreen
              open={isOpen}
              onClose={returnToInbox}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description" >

        <GrandparentLayout
          currentPost={currentPost}
          buttonText={["Go back to all messages", "Reply"]}
          buttonAction={[returnToInbox, replyToMessage]}
        />

      </Dialog>

  );
}

export default CurrentMsgModal;
