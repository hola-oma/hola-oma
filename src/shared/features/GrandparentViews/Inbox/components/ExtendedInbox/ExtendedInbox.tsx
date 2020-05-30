import React from 'react';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';

import { Post } from 'shared/models/post.model';
import { List } from '@material-ui/core';
import ExtendedInboxLetter from './components/ExtendedInboxLetter';

import './ExtendedInbox.css';

interface IExtendedInbox {
  posts: Array<Post>;
}

const ExtendedInbox: React.FC<IExtendedInbox> = ({posts}) => {
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
              <ExtendedInboxLetter post={post} key={post.pid}/>
            ))
            }
          </List>
        </Child>
      </Row>
    </div>
  )
}

export default ExtendedInbox;