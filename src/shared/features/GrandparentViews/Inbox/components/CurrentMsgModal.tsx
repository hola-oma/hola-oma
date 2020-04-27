import React, {useContext} from 'react';

import {Dialog} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../../GrandparentLayout";
import {GrandparentPostContext} from "../../../../../App";

interface ICurrentMsgModal {
  isOpen: boolean;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , replyToMessage, returnToInbox}) => {

  const FamilyPost = useContext(GrandparentPostContext).post;

  //todo: render photo
  const boxContent = FamilyPost.message + "\n\n" + FamilyPost.photoURL;

  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
      <Dialog fullScreen
              open={isOpen}
              onClose={returnToInbox}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description">

      <GrandparentLayout
        headerText={"Letter from "}
        boxContent={boxContent}
        buttonText={["Go Back to All Messages", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon />, <CreateIcon />]}
      />

      </Dialog>

  );
}

export default CurrentMsgModal;
