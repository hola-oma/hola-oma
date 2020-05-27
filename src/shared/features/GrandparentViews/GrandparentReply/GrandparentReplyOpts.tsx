import React from 'react';
import { useLocation, useHistory } from "react-router-dom";

import { GrandparentPostLayout } from "../Components/GrandparentPostLayout";
import { replyOptionIcons } from "../../../../Icons";
import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import {MEDIA_TYPES} from "../../../models/post.model";

import '../Grandparent.css';

const GrandparentReplyOpts: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  const getMediaURL = (): string => {
    if (currentPost.photoURL) { return currentPost.photoURL; }
    else if (currentPost.videoURL) { return currentPost.videoURL; }
    else { return ""; }
  }

  const getMediaType = (): string => {
    if (currentPost.photoURL) { return MEDIA_TYPES.IMAGE; }
    else if (currentPost.videoURL) { return MEDIA_TYPES.VIDEO; }
    else { return ""; }
  }

  return (
    <>
      <GrandparentLayout
        from={currentPost.from}
        headerText={"Letter from "}
        header2Text={"Choose how to reply below!"}
        boxContent={
          <GrandparentPostLayout
            from={currentPost.from}
            mediaURL={getMediaURL()}
            mediaType={getMediaType()}
            message={currentPost.message}
          />
        }
        buttonText={[buttonText.smiley, buttonText.voice, buttonText.photo]}
        buttonActions={[
          () => history.push({pathname: '/emoji', state: currentPost}),
          () => history.push({pathname: '/voice', state: currentPost}),
          () => history.push({pathname: '/photo', state: currentPost}),
        ]}
        buttonIcons={[replyOptionIcons.emoji, replyOptionIcons.voicemail, replyOptionIcons.photo]}
      />

     </>
    )
};

export default GrandparentReplyOpts;