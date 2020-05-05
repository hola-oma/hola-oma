import React, {useContext} from 'react';

import {Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';

import { GrandparentPostContext } from "../../../App";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  media: {
    paddingTop: 100,
    paddingBottom: 200,
    height: 200
  },
});

export const GrandparentPostView: React.FC = () => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;

  return (
    <Grid container justify="space-evenly">
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={FamilyPost.photoURL}
            title={"Post from " + FamilyPost.from}
            onClick={() => console.log("Modal to see photo?")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {FamilyPost.message}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

}

export default GrandparentPostView;
