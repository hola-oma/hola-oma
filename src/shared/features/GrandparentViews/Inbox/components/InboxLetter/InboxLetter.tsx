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
    <div className={`inboxLetterFrom ${name.length > 16 ? 'inboxLongName' : ''}`}>{name}</div>
  )
}

const formatSentDate = (dateToFormat: number) => {
  return (
    <div className="inboxDate"><Moment fromNow date={dateToFormat}/></div>
  )
}

const displayReadStatus = (postHasBeenRead: boolean) => {
  return (
    <span className="letterStatus">{postHasBeenRead ? '' : 'New!'}</span>
  )
}

const displayStamp = (name: string) => {
  return (
    <span className="stamp">{name.length > 0 ? name[0] : ':)'}</span>
  )
}

const InboxLetter: React.FC<IInboxLetter> = ({ post, onClickHandler }) => {

  const [postReadByCurrentUser, setPostReadByCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    setPostReadByCurrentUser(getPostReadByCurrentUser(post));
  }, [post]);

  return (
    <>
      <Card className={`envelopeCard ${postReadByCurrentUser ? 'read' : 'unread'}`} 
        id={`inbox-letter-${post.pid}`}
        key={post.pid}
        onClick={() => onClickHandler(post)}
        >
        {!postReadByCurrentUser && 
          <>
          {displayStamp(post.from)}
          </>
        }

        {/* {displayReadStatus(postReadByCurrentUser)} */}

        <CardContent className={`letterSenderInfo ${postReadByCurrentUser ? 'letterSenderInfoBack backLines' : 'letterSenderInfoFront'}`}>
            <p>
            {formatFrom(post.from)}
            </p>

            <p>
            {formatSentDate(post.date)}
            </p>

        </CardContent>
        
        {post.message.length > 0 && 
          <CardContent className={`messagePreview ${postReadByCurrentUser ? 'show' : 'hide'}`}>
            <p>{`"` + post.message + `"`}</p>
          </CardContent>
        }
      </Card>
    </>
  )
}

export default InboxLetter;