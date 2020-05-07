import React, { useContext } from 'react';

import {Grid, Typography, createStyles, IconButton, ButtonBase} from '@material-ui/core';

import { GrandparentPostContext } from "../../../App";
import { makeStyles } from "@material-ui/core/styles";

import { getMessageSubstring } from "../../../services/post";
import { magnifyIcon } from "../../../Icons";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  media: {
    width: '100%',
    height: 350,
  },
  both: {
    width: '100%',
    height: 200,
  },
  imageSrc: {
    position: 'absolute',
    left: '60%',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  imageButton: {
    position: 'absolute',
    bottom: '7%',
    right: '1%',
    backgroundColor: '#dbdbdb !important',    // disable hover with !important
  },
});

export const GrandparentPostView: React.FC = () => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <div className={classes.root}>

          {FamilyPost.photoURL &&
            <ButtonBase
                key={FamilyPost.from}
                className={FamilyPost.message ? classes.both : classes.media}
                style={{ width: 500 }}
            >
              <span className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${FamilyPost.photoURL})`,
                  }}
              />
              <IconButton
                  className={classes.imageButton}
                  color="primary"
                  aria-label="enlarge photo"
                  onClick={() => console.log("Open enlarge photo modal")}
              >
                {magnifyIcon.magnify}
              </IconButton>
            </ButtonBase>
          }

          <Typography variant="h5" align={'left'}>
            {!FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 650)}
            {FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 350)}
          </Typography>

        </div>
      </Grid>
    </Grid>
  )

}

export default GrandparentPostView;
