import React, { useState } from 'react';

import {
  Theme, Grid, Typography, Modal, Card,
  CardContent, CardMedia, CardActionArea,
} from '@material-ui/core';
import { makeStyles,  createStyles } from "@material-ui/core/styles";

import { viewPostIcons } from "../../../../Icons";
import {MEDIA_TYPES} from "../../../models/post.model";

import '../Grandparent.css';
import MessageTextDisplay from './MessageTextDisplay/MessageTextDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    objectFit: {
      objectFit: 'contain',
    },
    paper: {
      position: 'absolute',
      maxWidth: 800,
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface IPostLayout {
  from: string,
  mediaURL: string,
  mediaType: string,
  message: string
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const GrandparentPostLayout: React.FC<IPostLayout> = ({from, mediaURL, mediaType, message}) => {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const postImage = new Image();
  postImage.src = mediaURL;

  const handleClick = () => {
    imageModalOpen ? setImageModalOpen(false) : setImageModalOpen(true)
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>

      {/*Display image or video*/}
      {mediaType === MEDIA_TYPES.IMAGE &&
        <img src={mediaURL} alt={"Message content"}/>
      }
      {mediaType === MEDIA_TYPES.VIDEO &&
        <video controls autoPlay preload="auto">
          <source src={mediaURL}/>
        </video>
      }

      {/*Div for closing 'x' overlay*/}
      <div
        onClick={handleClick}
        style={{
          position: 'absolute',
          backgroundColor: '#d8e0e440',
          color: 'black',
          top: '0%',
          right: '0%',
        }}
      >
        {viewPostIcons.close}
      </div>
    </div>
  );

  return (
    <Grid container
          spacing={0}
          direction={"column"}
          alignItems="center"
          justify="flex-start"
          style={{ height: "auto", overflowY: "hidden" }} >
      {mediaURL &&
        <div style={{display: "inline-block"}}>
          <div id={`card-${mediaURL}`} className="grandparent-card" style={{height: '100%'}}>
            <div className="grandparent-cardActionArea" style={{display: 'flex', flexDirection: 'column'}}>
                <div className="grandparent-cardActionArea">
                    <CardMedia
                        component={mediaType === MEDIA_TYPES.IMAGE ? "img" : "video"}
                        className="grandarent-imagePreview"
                        image={mediaURL}
                        style={{maxHeight: '30vh', maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto', objectFit: 'contain'}}
                        onClick={handleClick} />
                      <div
                        onClick={handleClick}
                        style={{
                            position: 'absolute',
                            backgroundColor: '#d8e0e440',
                            color: 'black',
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                          }} >
                          { mediaType === MEDIA_TYPES.IMAGE && viewPostIcons.magnify }
                          { mediaType === MEDIA_TYPES.VIDEO && viewPostIcons.play }
                      </div>
                  </div>
                {message &&
                <CardContent>
                  <MessageTextDisplay message={message}/>
                </CardContent>
                }
              </div>
          </div>
        </div>
      }

      {!mediaURL &&
        <MessageTextDisplay message={message}/>
      }
      <Modal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </Grid>


  )

}

export default GrandparentPostLayout;
