import React, { useState } from 'react';

import {
  Theme, Grid, Typography, Modal, Card,
  CardContent, CardMedia, CardActionArea,
} from '@material-ui/core';
import { makeStyles,  createStyles } from "@material-ui/core/styles";

import { viewPostIcons } from "../../../../Icons";
import {MEDIA_TYPES} from "../../../models/post.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    objectFit: {
      objectFit: 'contain',
    },
    media: {
      height: 425,
    },
    shortText: {
      height: 400,
    },
    mediumShortText: {
      height: 350,
    },
    mediumText: {
      height: 300,
    },
    largeText: {
      height: 200,
    },
    paper: {
      position: 'absolute',
      maxWidth: 800,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
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

  const getStyle = (length: number) => {
    if (length <= 50) return `${classes.media} ${classes.objectFit}`;
    if (length <= 100) return `${classes.shortText} ${classes.objectFit}`;
    if (length <= 150) return `${classes.mediumShortText} ${classes.objectFit}`;
    if (length <= 200) return `${classes.mediumText} ${classes.objectFit}`;
    else return `${classes.largeText} ${classes.objectFit}`;
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>

      {/*Display image or video*/}
      {mediaType === MEDIA_TYPES.IMAGE &&
        <img src={mediaURL} alt={"Message content"}/>
      }
      {mediaType === MEDIA_TYPES.VIDEO &&
      <video controls autoPlay muted>
          <source src={mediaURL} type="video/mp4"/>
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
          justify="center"
          style={{ height: "100%", overflowY: "hidden" }} >
      {mediaURL &&
        <Grid item xs={12} style={{display: "inline-block"}}>
          <Card >
              <CardActionArea>
                  <div style={{ position: 'relative' }} >
                      <CardMedia
                          component={mediaType === MEDIA_TYPES.IMAGE ? "img" : "video"}
                          className={getStyle(message.length)}
                          image={mediaURL}
                          onClick={handleClick}
                      />
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
                          {viewPostIcons.magnify}
                      </div>

                  </div>
                {message &&
                <CardContent>
                    <Typography
                        variant="h5"
                        color="textPrimary"
                        component="p"
                        style={{overflowWrap: "break-word"}}
                        align={message.length <= 50 ? "center" : "left"}
                    >
                      {message}
                    </Typography>
                </CardContent>
                }
              </CardActionArea>
          </Card>
        </Grid>
      }

      {!mediaURL &&
        <Typography variant="h5" align={message.length <= 50 ? "center" : "left"} >
          {message}
        </Typography>
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
