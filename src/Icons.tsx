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

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import smile from '../src/icons/smile.png';
import thumbsup from '../src/icons/thumbsup.png';
import frown from '../src/icons/frown.png';
import heart from '../src/icons/heart.png';
import cake from '../src/icons/cake.png';
import bandAid from '../src/icons/band-aid.png';

// Returns an array so both grandparent and family sides can map and/or access by index
export const replyEmojiPNGs = () => {
  return [
    smile,
    thumbsup,
    frown,
    heart,
    cake,
    bandAid,
  ];
}

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

export const cameraIcons = {
  openEnvelope: <DraftsIcon fontSize={"large"}/>,
  camera: <PhotoCameraIcon fontSize={"large"}/>,
  paperAirplane: <SendIcon fontSize={"large"}/>
}

export const viewPostIcons = {
  magnify: <ZoomInIcon fontSize={"large"}/>,
  play: <PlayCircleOutlineIcon fontSize={"large"}/>,
  close: <CancelPresentationIcon fontSize={"large"}/>
}