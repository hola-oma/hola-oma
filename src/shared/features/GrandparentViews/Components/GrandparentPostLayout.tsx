import React, { useEffect, useState } from 'react';

import {Theme, Grid, Typography, ButtonBase, Modal} from '@material-ui/core';
import { makeStyles,  createStyles } from "@material-ui/core/styles";

import {  getMessageSubstring } from "../../../../services/post";
import { magnifyIcon } from "../../../../Icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  media: {
    width: '100%',
    height: 425,
    objectFit: 'contain',
  },
  both: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  textSpace: {
    marginTop: '10%',
  },
  imageSrc: {
    position: 'absolute',
    left: '33%',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  imageButton: {
    position: 'absolute',
    bottom: '0%',
    backgroundColor: '#d8e0e440 !important'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
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
  imageURL: string,
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

export const GrandparentPostLayout: React.FC<IPostLayout> = ({from, imageURL, message}) => {

  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const postImage = new Image();
  postImage.src = imageURL;

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <img src={imageURL} alt={"Message from {from}"}></img>
    </div>
  );

  useEffect(() => {
    postImage.addEventListener('load', () => {
      setLoaded(true);
    })
  });

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <div className={classes.root}>

          {imageURL &&
          <div className={classes.root} onClick={() => setImageModalOpen(true)}>
            <ButtonBase
                key={from}
                className={message ? classes.both : classes.media}
                style={{ width: postImage.width }}
                 >
              <span className=
                  {classes.imageSrc}
                  style={{
                      backgroundImage: `url(${imageURL})`,
                      display: loaded ? "" : "none",
                    }}  />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton} >
                  <Typography
                      component="span"
                      className={classes.imageButton}
                      color="primary"
                      aria-label="enlarge photo"
                      onClick={() => setImageModalOpen(true)} >
                    {magnifyIcon.magnify}
                  </Typography>
                </span>
            </ButtonBase>
          </div>
          }

          <Typography variant="h5"
                      className={message.length < 50 ? classes.textSpace : ""}
                      align={message.length < 50 ? "center" : "left"}
          >
            {!imageURL && getMessageSubstring(message, 625)}
            {imageURL && getMessageSubstring(message, 325)}
          </Typography>

          <Modal
            open={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {modalBody}
          </Modal>

        </div>
      </Grid>
    </Grid>
  )

}

export default GrandparentPostLayout;
