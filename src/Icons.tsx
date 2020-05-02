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
export const emojiArray = (): Array<React.ReactElement<SvgIconProps>> => {
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
  closedEnvelope: <MailIcon />,
  openEnvelope: <DraftsIcon />,
  paperAirplane: <SendIcon />
}

export const replyOptionIcons = {
  closedEnvelope: <MailIcon />,
  emoji: <InsertEmoticonIcon />,
  voicemail: <PermPhoneMsgIcon />,
  photo: <PhotoCameraIcon />
}
