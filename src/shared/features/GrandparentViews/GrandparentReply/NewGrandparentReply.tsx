import React, { useState, useEffect } from 'react';

import { useLocation } from "react-router";

import { getUserProfile } from "services/user";
import { Reply } from 'shared/models/reply.model';
import {createReply, updateReplyID} from "../../../../services/reply";
import {Box} from "@material-ui/core";

export interface IReplyContent {
  value: string;
}

export const NewGrandparentReply: React.FC<IReplyContent> = ({ value }) => {
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const location = useLocation();
  let currentReply: any;

  console.log(location.pathname);

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        setDisplayName(userProfile.displayName);
        setUserId(userProfile?.uid);
      }).then( () => {
        currentReply = location.state;
        console.log("current reply value: " + currentReply.value);
      });
  }, [location]);

  return (
    <>
      New reply added.
      Insert Grandparent Layout here.
    </>
  )
};

export default NewGrandparentReply;