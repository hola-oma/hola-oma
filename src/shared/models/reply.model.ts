import {Post} from "./post.model";

export interface Reply {
  rid: string,
  creatorID: string,
  creatorName: string,
  date: number,
  from: string,
  read: boolean,
  message: Array<string>,
  responseTo: Post,
  receiverIDs: Array<string>
}