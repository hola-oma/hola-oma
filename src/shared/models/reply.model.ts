import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CakeIcon from "@material-ui/icons/Cake";
import HealingIcon from "@material-ui/icons/Healing";
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';

export const REPLY_TYPES = {
  EMOJI: "emoji",
  PHOTO: "photo",
  VOICE: "voice"
}

export const Icons: Map<string, any> = new Map([
  ["smileyFace", InsertEmoticonIcon],
  ["thumbUp", ThumbUpIcon],
  ["sadFace", SentimentVeryDissatisfiedIcon],
  ["heart", FavoriteIcon],
  ["cake", CakeIcon],
  ["bandAid", HealingIcon],
  ["closedEnvelope", MailIcon],
  ["paperAirplane", SendIcon]
]);


export interface Reply {
  rid: string,
  creatorID: string,
  from: string,
  date: number,
  read: boolean,
  replyType: string,
  message: Array<string>,
  responseTo: string,
  receiverID: string
}