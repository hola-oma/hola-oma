import React from 'react';
import {useHistory} from "react-router-dom";

import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';

import { Post } from 'shared/models/post.model';
import { List } from '@material-ui/core';
import ExtendedInboxLetter from './components/ExtendedInboxLetter';

import { markPostRead } from "../../../../../../services/post";

import LockIcon from '@material-ui/icons/Lock';

import './ExtendedInbox.css';

interface IExtendedInbox {
  posts: Array<Post>;
}

let currentPost: Post;

const ExtendedInbox: React.FC<IExtendedInbox> = ({posts}) => {

  const history = useHistory();

  const pressEnvelope = async function (envelopePost: Post) {
    currentPost = envelopePost;
    let postID = currentPost?.pid;
    await markPostRead(postID);
    history.push({pathname: '/startReply', state: envelopePost } );
  }

  return (
    <div className="extendedInboxModalContent">
      <Row justify="flex-start">
        <Child xs={12}>
          <div className="welcomeName">
            <span className="boldText">All Letters</span>
          </div>
        </Child>

        <Child>
          <List id="grid-list-extended-inbox">
            {posts.map((post, index: number) => (
              <ExtendedInboxLetter post={post} key={post.pid} onClickHandler={pressEnvelope}/>
            ))
            }
            <div className="unlockPremium">
              <p><LockIcon /><br/>Showing your 30 most recent letters. Upgrade to <i>Hola, Oma!</i> Premium to see all letters.</p>
            </div>
          </List>
        </Child>
      </Row>
    </div>
  )
}

export default ExtendedInbox;