import React, { useContext, useEffect, useState } from 'react';

import { Theme, Grid, Typography, IconButton, ButtonBase } from '@material-ui/core';

import { GrandparentPostContext } from "../../../App";
import { makeStyles,  createStyles } from "@material-ui/core/styles";

import {  getMessageSubstring } from "../../../services/post";
import { magnifyIcon } from "../../../Icons";

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
    bottom: '1%',
    right: '1%',
    backgroundColor: '#dbdbdb !important',    // disable hover with !important
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  }),
);

export const GrandparentPostView: React.FC = () => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;
  const [loaded, setLoaded] = useState(false);

  const postImage = new Image();
  postImage.src = FamilyPost.photoURL;

  useEffect(() => {
    postImage.addEventListener('load', () => {
      setLoaded(true);
    })
  });

  const enlargeImage = () => {
    console.log("Open enlarge image modal");
  }

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <div className={classes.root}>

          {FamilyPost.photoURL &&
          <div className={classes.root}>
            <ButtonBase
                key={FamilyPost.from}
                className={FamilyPost.message ? classes.both : classes.media}
                style={{ width: postImage.width }} >
              <span className=
                  {classes.imageSrc}
                  onClick={enlargeImage}
                  style={{
                      backgroundImage: `url(${FamilyPost.photoURL})`,
                      display: loaded ? "" : "none",
                    }}  />
                {/*<span className={classes.imageBackdrop} />*/}
                <span className={classes.imageButton} />
            </ButtonBase>

            <IconButton
               className={classes.imageButton}
               color="primary"
               aria-label="enlarge photo"
               onClick={enlargeImage} >
                  {magnifyIcon.magnify}
               </IconButton>
          </div>
          }

          <Typography variant="h5"
                      className={FamilyPost.message.length < 50 ? classes.textSpace : ""}
                      align={FamilyPost.message.length < 50 ? "center" : "left"}
          >
            {!FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 625)}
            {FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 325)}
          </Typography>

        </div>
      </Grid>
    </Grid>
  )

}

export default GrandparentPostView;
