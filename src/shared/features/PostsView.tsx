import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";

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

  return (
    <>
    <h1>Welcome, {displayName}!</h1>
    <h2>Account type: {role}</h2>
    {role === roles.poster && <div>Offer the option to make a post</div>}
    {role === roles.receiver && <div>View the latest post(s) from linked posters</div>}
    <div>If no account is linked, remind the user to link with another user</div>

    <p>Todo: Users who use Google to sign/log in need an opportunity to choose their role</p>
    </>
  )
}

export default PostsView;