export interface Post {
  creatorID: string,
  from: string,
  read: boolean,
  message: string,
  photoURL: string,
  date: number,
  receiverIDs: Array<string>
} 