import React, { useState } from "react";
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Button } from "@material-ui/core";

interface IPhotoReplyPrototype {
  // empty for now
}

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user"
};

const PhotoReplyPrototype: React.FC<IPhotoReplyPrototype> = ({ }) => {

  const [photoPreview, setPhotoPreview] = useState("");

  /* Adapted from https://www.npmjs.com/package/react-webcam */

  const webcamRef = React.useRef<any>(null);
 
  const capture = React.useCallback(() => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      setPhotoPreview(imageSrc);
    },
    [webcamRef]
  );

  const sendPhoto = () => {
    console.log("sending photo! [this doesn't do anything yet]");
  }

  return (
   <div>
     <h1>Take a photo!</h1>
     
      {/* No photo exists, prompt user to take one */}
      {!photoPreview &&
        <>
        <Webcam 
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          height={360}
          width={640}
          videoConstraints={videoConstraints}
          />

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
        <img src={photoPreview}></img>
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
          onClick={() => sendPhoto()}
        >
          Send photo!
        </Button>
        </>
      }
      
   </div>
  );
};

export default PhotoReplyPrototype;
