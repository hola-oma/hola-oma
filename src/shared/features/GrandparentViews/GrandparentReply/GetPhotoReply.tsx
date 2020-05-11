import React, {useEffect, useState} from "react";
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Button } from "@material-ui/core";

import {setReplyContent, submitReply, uploadPhoto} from 'services/reply';
import { cameraIcons } from "../../../../Icons";
import GrandparentLayout from "../Components/GrandparentLayout";
import {useHistory, useLocation} from "react-router";
import {getUserProfile} from "../../../../services/user";
import {Reply, REPLY_TYPES} from "../../../models/reply.model";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface IPhotoReplyPrototype {
  // empty for now
}

const videoConstraints = {
  width: 1024,
  height: 576,
  facingMode: "user"
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    photo: {
      margin: theme.spacing(7),
    },
  }),
);

const GetPhotoReply: React.FC<IPhotoReplyPrototype> = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        setDisplayName(userProfile.displayName);
        setUserId(userProfile?.uid);
      });
  }, []);

  /* Adapted from https://www.npmjs.com/package/react-webcam */
  const webcamRef = React.useRef<any>(null);
  const capture = React.useCallback(() => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      setPhotoPreview(imageSrc);
    },
    [webcamRef]
  );

  const buildReply = (e: any, choicesIndexes: Array<number>) => {
      const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.EMOJI,
        choicesIndexes, currentPost.pid, currentPost.creatorID);
      submitReply(e, replyContent)
        .then( () => { history.push({
          pathname: "/newReply",
          state: {
            replyContent: replyContent,
            currentPost: currentPost  }
        });
        });
    }

  // const sendPhoto = (photoRef: string) => {
  //   let replyID = uploadPhoto(photoRef);
  //   console.log("Photo attached to reply with ID: ", replyID);
  // }
  // className={ highlightedList[index] ? classes.highlighted : classes.root }

  return (
    <div>
      {/* No photo exists, prompt user to take one */}
      {/*{!photoPreview &&*/}
      <>
        <GrandparentLayout
            from={currentPost.from}
            headerText={ !photoPreview ? "Take a photo to send to " : "Sending photo to"}
            boxContent={ !photoPreview ?
              <Webcam className={"photo"}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              /> :
              <img src={photoPreview} alt="preview"></img>
            }
            buttonText={!photoPreview ? ["Take Photo"] : ["Retake Photo", "Send Photo"]}
            buttonActions={!photoPreview ? [capture] : [capture, () => console.log("send photo")]}
            buttonIcons={!photoPreview ? [cameraIcons.camera] : [cameraIcons.camera, cameraIcons.paperAirplane]} />
      </>
    </div>
  );
};

export default GetPhotoReply;
