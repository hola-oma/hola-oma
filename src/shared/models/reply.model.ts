export interface Reply {
  rid: string,
  creatorID: string,
  date: number,
  from: string,
  read: boolean,
  message: Array<string>,
  responseTo: string,
  receiverID: string
}