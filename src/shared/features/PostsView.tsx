import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import Inbox from './Inbox/Inbox';
import { Box } from '@material-ui/core';

const PostsView: React.FC = () => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // todo: get user posts
    getUserProfile()
      .then((userProfile:any) => {
        setDisplayName(userProfile.displayName);
      });

    getUserSettings()
      .then((doc:any) => {
        setRole(doc?.role);
      });
  }, []); // fires on page load if this is empty [] 

  // Mock data, eventually replaced by db data loaded in from db using a useEffect 
  // that calls the matching service in services/posts.ts (does not exist yet)

  let posts = [
    {"id": "abc123", "from": "Stephanie", "read": false},
    {"id": "abc124", "from": "Elizabeth H.", "read": false},
    {"id": "abc125", "from": "Nathaniel", "read": true},
    {"id": "abc126", "from": "Jacqueline Quentin", "read": true},
    {"id": "abc125", "from": "Grandson Everett", "read": true},
    {"id": "abc125", "from": "Mary Jane's Mom & Dad", "read": true},
  ]

  return (
    <>
    <h1>Welcome, {displayName}!</h1>
    <h2>Account type: {role}</h2>
    {role === roles.poster && <div>Offer the option to make a post</div>}
    {role === roles.receiver && <Inbox posts={posts}/>}

    <Box className="todo">
      <h3>To do items:</h3>
      <ul>
        <li>Make the envelope cards clickable, clicking one goes to a page to view it</li>
        <li>If no account is linked, remind the user to link with another user</li>
        <li>Shrink font or truncate sender's name when sender's names are so long they distort the length of the card</li>
      </ul>
    </Box>
    </>
  )
}

export default PostsView;