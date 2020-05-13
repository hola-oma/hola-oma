import React, { useState } from 'react';

import { Theme, Grid, Typography, Modal, Card,
  CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import { makeStyles,  createStyles } from "@material-ui/core/styles";

import {  getMessageSubstring } from "../../../../services/post";
import { magnifyIcon } from "../../../../Icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  media: {
    height: 425,
    objectFit: 'contain',
  },
  both: {
    height: 200,
    objectFit: 'contain',
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
  const [modalStyle] = React.useState(getModalStyle);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const postImage = new Image();
  postImage.src = imageURL;

  console.log("message length: " + message.length);

  const handleClick = () => {
    imageModalOpen ? setImageModalOpen(false) : setImageModalOpen(true)
  }

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <img src={imageURL} alt={"Message from {from}"}></img>
    </div>
  );

  // todo: test messages with different lengths to adjust CardMedia className
  return (
    <Grid container
          spacing={0}
          direction={"column"}
          alignItems="center"
          justify="center"
          style={{ height: "100%", overflowY: "hidden" }}
    >
      {imageURL &&
      <Grid item >
          <Card >
              <CardActionArea>
                  <div style={{ position: 'relative' }} >
                      <CardMedia
                          component="img"
                          className={ (message.length > 200) ? classes.both : classes.media}
                          image={imageURL}
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
                          {magnifyIcon.magnify}
                      </div>

                  </div>
                {message &&
                <CardContent>
                    <Typography variant="h6" color="textPrimary" component="p">
                      {getMessageSubstring(message, 400)}
                    </Typography>
                </CardContent>
                }

              </CardActionArea>
          </Card>
      </Grid>
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
