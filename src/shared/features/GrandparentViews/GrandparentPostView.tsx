import React, {useContext} from 'react';

import {Container, Grid, Typography} from '@material-ui/core';

import { GrandparentPostContext } from "../../../App";
import {makeStyles} from "@material-ui/core/styles";

import { getMessageSubstring } from "../../../services/post";


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  media: {
    width: '100%',
    height: 350,
    objectFit: 'contain',
  },
  both: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  }
});

export const GrandparentPostView: React.FC = () => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <Container>
          {FamilyPost.photoURL && <img
              className={FamilyPost.message ? classes.both : classes.media}
              src={FamilyPost.photoURL}
              alt={"Message from " + FamilyPost.from}
          />}
          <Typography variant="h5" align={'left'}>
            {!FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 650)}
            {FamilyPost.photoURL && getMessageSubstring(FamilyPost.message, 350)}
          </Typography>
        </Container>
      </Grid>
    </Grid>
  )

}

export default GrandparentPostView;
