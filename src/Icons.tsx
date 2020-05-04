import React from "react";
import { SvgIconProps } from "@material-ui/core";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CakeIcon from "@material-ui/icons/Cake";
import HealingIcon from "@material-ui/icons/Healing";

import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

// Returns an array so both grandparent and family sides can map and/or access by index
export const replyEmojiArray = (): Array<React.ReactElement<SvgIconProps>> => {
  return [
    <InsertEmoticonIcon/>,
    <ThumbUpIcon/>,
    <SentimentVeryDissatisfiedIcon/>,
    <FavoriteIcon/>,
    <CakeIcon/>,
    <HealingIcon/>
  ];
}

export const mailIcons = {
  closedEnvelope: <MailIcon fontSize={"large"}/>,
  openEnvelope: <DraftsIcon fontSize={"large"}/>,
  paperAirplane: <SendIcon fontSize={"large"}/>
}

export const replyOptionIcons = {
  closedEnvelope: <MailIcon />,
  emoji: <InsertEmoticonIcon />,
  voicemail: <PermPhoneMsgIcon />,
  photo: <PhotoCameraIcon />
}

export const iconSvgPaths = {
  closedEnvelope: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
}

// Mail: https://github.com/mui-org/material-ui/blob/56c113217d7d05d8bb0712771b727df81984d04b/src/svg-icons/content/mail.js
// Mail Outline: https://github.com/mui-org/material-ui/blob/56c113217d7d05d8bb0712771b727df81984d04b/src/svg-icons/communication/mail-outline.js