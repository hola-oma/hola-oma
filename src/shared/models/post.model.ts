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
  unreadReplyCount?: number
}