import React, {useState, useEffect} from 'react';
import { Post } from 'shared/models/post.model';
import Moment from 'react-moment';
import { Card, CardContent } from '@material-ui/core';
import {getPostReadByCurrentUser} from "../../../../../../services/post";

import './InboxLetter.css';

interface IInboxLetter {
  post: Post;
  onClickHandler: (Post: any) => {};
}

const formatFrom = (name: string) => {
  return (
    <span className={`inboxLetterFrom ${name.length > 16 ? 'inboxLongName' : ''}`}>{name}</span>
  )
}

const formatSentDate = (dateToFormat: number) => {
  return (
    <span className="inboxDate"><Moment fromNow date={dateToFormat}/></span>
  )
}

const displayStamp = (name: string) => {
  return (
    <span className="stamp">{name.length > 0 ? name[0] : ':)'}</span>
  )
}

const rotate = () => {
  let randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
  if (randomNumber % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

const InboxLetter: React.FC<IInboxLetter> = ({ post, onClickHandler }) => {

  const [postReadByCurrentUser, setPostReadByCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    setPostReadByCurrentUser(getPostReadByCurrentUser(post));
  }, [post]);

  return (
    <>
      <Card className={`envelopeCard ${postReadByCurrentUser ? 'read' : 'unread'} ${rotate() ? 'rotateLeft' : 'rotateRight'}`} 
        id={`inbox-letter-${post.pid}`}
        key={post.pid}
        onClick={() => onClickHandler(post)}
        >
        {!postReadByCurrentUser && 
          <>
          {displayStamp(post.from)}
          </>
        }

        <CardContent className={`letterSenderInfo ${postReadByCurrentUser ? 'letterSenderInfoBack' : 'letterSenderInfoFront'}`}>
            {!postReadByCurrentUser &&
              <>
                <p>
                {formatFrom(post.from)}
                </p>

                <p className="letterSentDate">
                <span className="newBadge">New!</span>{/* {formatSentDate(post.date)} */}
                </p>
              </>
            }

            {postReadByCurrentUser &&
              <>
              {post?.message.length > 0 && 
                <div className="letterMessagePreview letterItemShadow">{post.message}</div>
              }

              {post.photoURL.length > 0 && 
                <div className="letterPhotoPreview letterItemShadow"></div>
              }

              {post.videoURL.length > 0 && 
                <div className="letterPhotoPreview letterItemShadow letterVideoPreview"></div>
              }

              <div className="envelopeBackShape inboxLetterFromOnBack">
                <p>
                  {formatFrom(post.from)}
                </p>

                <p>
                  {formatSentDate(post.date)}
                </p>
              </div>
              </>
            }

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