import React, { useState } from "react";
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Button } from "@material-ui/core";

import { uploadPhoto } from 'services/reply';
import { cameraIcon } from "../../../../Icons";
import GrandparentLayout from "../Components/GrandparentLayout";

interface IPhotoReplyPrototype {
  // empty for now
}

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user"
};

const GetVoiceReply: React.FC<IPhotoReplyPrototype> = () => {

  const [photoPreview, setPhotoPreview] = useState("");

  /* Adapted from https://www.npmjs.com/package/react-webcam */

  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      setPhotoPreview(imageSrc);
    },
    [webcamRef]
  );

  // const sendPhoto = (photoRef: string) => {
  //   let replyID = uploadPhoto(photoRef);
  //   console.log("Photo attached to reply with ID: ", replyID);
  // }

  return (
    <div>
      {/*<h1>Take a photo!</h1>*/}

      {/* No photo exists, prompt user to take one */}
      {!photoPreview &&
      <>
        <GrandparentLayout
            from={"Samantha"}
            headerText={"Replying to Kristin"}
            boxContent={
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                height={360}
                width={640}
                videoConstraints={videoConstraints}
              />
            }
            buttonText={["Take Picture"]}
            buttonActions={[() => console.log("Take photo")]}
            buttonIcons={[cameraIcon.camera]} />



          <br/>
          <Button
              className="bigButton"
              variant="contained"
              color="primary"
              size="large"
              onClick={capture}
              startIcon={<CameraAltIcon />}
          >
              Take Photo
          </Button>
      </>
      }

      {/* Preview exists, user can re-take if they want */}
      {photoPreview &&
      <>
          <img src={photoPreview} alt="preview"></img>
          <br/>
          <Button
              className="bigButton"
              variant="contained"
              color="primary"
              size="large"
              onClick={capture}
              startIcon={<CameraAltIcon />}
          >
              Retake photo
          </Button>
          &nbsp;
          <Button
              className="bigButton"
              variant="contained"
              color="secondary"
              size="large"
              // onClick={() => sendPhoto(photoPreview)}
              onClick={() => console.log("Send photo")}
          >
              Send photo!
          </Button>
      </>
      }

    </div>
  );
};

export default GetVoiceReply;
