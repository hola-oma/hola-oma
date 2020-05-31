
import React, { useEffect, useState } from 'react';

import { Post } from 'shared/models/post.model';

import DraftsIcon from '@material-ui/icons/Drafts';
import EmailIcon from '@material-ui/icons/Email';

import {getPostReadByCurrentUser} from "../../../../../../../services/post";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

import Moment from 'react-moment';

import './ExtendedInboxLetter.css';

interface IExtendedInboxLetter {
  post: Post;
  onClickHandler: (Post: any) => {};
}

const formatDate = (dateToFormat: number) => {
  return (
    <span className="inboxDate">Received: <Moment format="dddd, MMMM Do, YYYY" date={dateToFormat}/></span>
  )
}

const ExtendedInboxLetter: React.FC<IExtendedInboxLetter> = ({ post, onClickHandler }) => {
  const [postReadByCurrentUser, setPostReadByCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    setPostReadByCurrentUser(getPostReadByCurrentUser(post));
  }, [post]);

  return (
    <ListItem 
      onClick={() => onClickHandler(post)} 
      id={`listItem-${post.pid}`}
      divider>
      <ListItemAvatar>
        <Avatar className={`${postReadByCurrentUser? 'avatarColorRead' : 'avatarColorUnread'}`}>
          {postReadByCurrentUser ? <DraftsIcon /> : <EmailIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={post.from} secondary={formatDate(post.date)}/>
    </ListItem>
  )
}

export default ExtendedInboxLetter;

