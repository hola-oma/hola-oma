import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router";

import { getUserProfile } from "services/user";
import { Reply } from 'shared/models/reply.model';
import {createReply, updateReplyID} from "../../../../services/reply";

export interface IReplyContent {
  value: string;
}

export const NewGrandparentReply: React.FC<IReplyContent> = ({ value }) => {
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        console.log(userProfile);
        setDisplayName(userProfile.displayName);
        setUserId(userProfile?.uid);
      })
  }, []);

  return (
    <>
      New reply added.
      Insert Grandparent Layout here.
    </>
  )
};

export default NewGrandparentReply;