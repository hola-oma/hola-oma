import React from "react";

import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
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

export const mailIcons = {
  closedEnvelope: <MailIcon fontSize={"large"}/>,
  openEnvelope: <DraftsIcon fontSize={"large"}/>,
  paperAirplane: <SendIcon fontSize={"large"}/>
}

export const replyOptionIcons = {
  closedEnvelope: <MailIcon />,
  emoji: <InsertEmoticonIcon />,
  voicemail: <MicIcon />,
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