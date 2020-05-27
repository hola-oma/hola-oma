import React from 'react';
import { Post } from 'shared/models/post.model';
import Moment from 'react-moment';
import { GridListTile, GridListTileBar } from '@material-ui/core';
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
    <span><span className="inboxFrom"></span> {name}</span>
  )
}

const formatSentDate = (dateToFormat: number) => {
  return (
    <span><Moment format="MM/DD/YY -- M:HHa" date={dateToFormat}/></span> 
  )
}

const InboxLetter: React.FC<IInboxLetter> = ({ post, onClickHandler }) => {

  return (
    <GridListTile
      id={`grid-list-tile-${post.pid}`}
      className="inboxLetter"
      key={post.pid}
      onClick={() => onClickHandler(post)}
      rows={1.25} >
      <img 
          src={getPostReadByCurrentUser(post) ? mailOpen : mailClosed}
          alt={"Letter from " + post.from} 
      />

      <GridListTileBar
        title={formatFrom(post.from)}
        subtitle={formatSentDate(post.date)}
        className="inboxLetterInfo"
        />
    </GridListTile>
  )
}

export default InboxLetter;