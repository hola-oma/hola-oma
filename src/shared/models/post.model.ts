export const MEDIA_TYPES = {
  IMAGE: "img",
  VIDEO: "video"
}

export interface Post {
  pid: string,
  creatorID: string,
  from: string,
  read: {[key: string]: boolean},
  message: string,
  photoURL: string,
  videoURL: string,
  date: number,
  receiverIDs: Array<string>,
  unreadReplyCount?: number,
  totalReplyCount?: number
}