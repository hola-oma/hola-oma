export const REPLY_TYPES = {
  EMOJI: "emoji",
  PHOTO: "photo",
  VOICE: "voice"
}

export interface Reply {
  rid: string,
  creatorID: string,
  from: string,
  date: number,
  read: boolean,
  replyType: string,
  message: Array<number> | string,
  responseTo: string,
  receiverID: string
}