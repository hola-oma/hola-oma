import React from 'react';

import { Dialog } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../../GrandparentLayout";
import {GrandparentPostView} from "../../GrandparentPostView";

interface ICurrentMsgModal {
  isOpen: boolean;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , replyToMessage, returnToInbox}) => {

  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
    <Dialog fullScreen
            open={isOpen}
            onClose={returnToInbox}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

      <GrandparentLayout
        headerText={"Letter from "}
        boxContent={ <GrandparentPostView/> }
        buttonText={["Go Back to All Messages", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon/>, <CreateIcon/>]}
      />

    </Dialog>

  );

}

export default CurrentMsgModal;
