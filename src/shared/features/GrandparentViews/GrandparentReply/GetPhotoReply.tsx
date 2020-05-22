import React, {useEffect, useState} from "react";
import Webcam from "react-webcam";

import { setReplyContent, submitReply } from 'services/reply';
import { cameraIcons } from "../../../../Icons";
import GrandparentLayout, {buttonText} from "../Components/GrandparentLayout";
import { useHistory, useLocation } from "react-router";
import { getUserProfile } from "../../../../services/user";
import { Reply, REPLY_TYPES } from "../../../models/reply.model";
import {Grid} from "@material-ui/core";

import { isIOS, isSafari } from 'react-device-detect';


// Reminder: https://stackoverflow.com/questions/29642685/maintain-aspect-ratio-of-image-with-full-width-in-react-native
const videoConstraints = {
  maxWidth: 848,     // 16:9 aspect ratio
  maxHeight: 477,
  facingMode: "user"
};

const GetPhotoReply: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const currentPost: any = location.state;

  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const [supportedMessage, setSupportedMessage] = useState("");
  const [supportedDeviceBrowser, setSupportedDeviceBrowser] = useState<boolean>(false);

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

  const buildReply = (e: any) => {
    const replyContent: Reply = setReplyContent(userId, displayName, REPLY_TYPES.PHOTO,
                                photoPreview, currentPost.pid, currentPost.creatorID);
    submitReply(e, replyContent)
      .then( () => { history.push({
        pathname: "/sentReply",
        state: {
          replyContent: replyContent,
          currentPost: currentPost  }
      });
    });
  }

  // see if the user's device and browser combo supports microphone usage 
  useEffect(() => {
    if (isIOS && !isSafari) {
      setSupportedMessage("iPad and iPhone users must use Safari to access microphone features.");
      setSupportedDeviceBrowser(false);
    } else {
      setSupportedDeviceBrowser(true);
    }
  }, [])

  return (
    <>
      { currentPost &&
        <GrandparentLayout
            from={currentPost.from}
            headerText={ !photoPreview ? "Take a photo to send to " : "Sending photo to "}
            boxContent={
              <>
                { supportedDeviceBrowser &&
                  <Grid container
                        spacing={0}
                        direction={"column"}
                        alignItems="center"
                        justify="center"
                        style={{ height: "100%", overflowY: "hidden" }}
                        >

                    {!photoPreview &&
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        // width={848}
                        height={477}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                      />
                    }

                    {photoPreview &&
                      <img src={photoPreview} alt="Current selfie"/>
                    }

                    </Grid>
                  }

                {!supportedDeviceBrowser &&
                  <p>{supportedMessage}</p>
                }
                </>
              }
              buttonText={!photoPreview ?
                [buttonText.backToMessage, buttonText.take] :
                [buttonText.backToMessage, buttonText.retake, buttonText.send]}
              buttonActions={!photoPreview ?
                [() => history.push({pathname: '/startReply', state: currentPost }), capture] :
                [() => history.push({pathname: '/startReply', state: currentPost }), capture, e => buildReply(e) ]}
              buttonIcons={!photoPreview ?
                [cameraIcons.openEnvelope, cameraIcons.camera] :
                [cameraIcons.openEnvelope, cameraIcons.camera, cameraIcons.paperAirplane]}
          />
      }
    </>
  );
};

export default GetPhotoReply;
