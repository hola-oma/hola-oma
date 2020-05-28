import React, {useState, useEffect} from 'react';
import { Post } from 'shared/models/post.model';
import Moment from 'react-moment';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import {getPostReadByCurrentUser} from "../../../../../../services/post";

import './InboxLetter.css';

import mailOpen from '../../../../../../icons/mail-open.png';
import mailClosed from '../../../../../../icons/mail-closed.png';

interface IInboxLetter {
  post: Post;
  onClickHandler: (Post: any) => {};
}

const formatFrom = (name: string) => {
  return (
    <li><div className={`inboxFrom ${name.length > 16 ? 'inboxLongName' : ''}`}>{name}</div></li>
  )
}

const formatSentDate = (dateToFormat: number) => {
  return (
    <li><span className="inboxDate"><Moment format="MM/DD/YY -- M:HHa" date={dateToFormat}/></span></li> 
  )
}

const displayReadStatus = (postHasBeenRead: boolean) => {
  return (
    <span className="letterStatus">{postHasBeenRead ? '' : 'New!'}</span>
  )
}

const InboxLetter: React.FC<IInboxLetter> = ({ post, onClickHandler }) => {

  const [postReadByCurrentUser, setPostReadByCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    setPostReadByCurrentUser(getPostReadByCurrentUser(post));
  }, [post]);

  return (
    <>
      <Card className="envelopeCard" 
        id={`inbox-letter-${post.pid}`}
        key={post.pid}
        onClick={() => onClickHandler(post)}
        >
        {displayReadStatus(postReadByCurrentUser)}
        <CardMedia className="envelopeIcon" image={postReadByCurrentUser ? mailOpen : mailClosed}/>

        <CardContent className="letterSenderInfo">
          <ul>
            {formatFrom(post.from)}
            {/* <li className="inboxLetterFrom">Received on</li> */}
            {formatSentDate(post.date)}
          </ul>
        </CardContent>
        
        <CardContent className="messagePreview">
          <p>{`"` + post.message + `"`}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default InboxLetter;