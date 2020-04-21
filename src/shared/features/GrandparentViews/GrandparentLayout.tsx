import React from 'react';

import {Post} from '../../models/post.model';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, Grid} from "@material-ui/core";

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';

interface IGrandparentLayout {
  currentPost: Post;
  buttonText: Array<string>;      // array for however many buttons needed (should be 2 or 3)
  buttonAction: { (): void; } [];
  // todo: pass in icon? or have all imported here and pass in choice
}

const GrandparentLayout: React.FC<IGrandparentLayout> = ({ currentPost , buttonText, buttonAction}) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      button: {
        margin: theme.spacing(1),
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      title: {
        padding: theme.spacing(2),
        textAlign: 'center',
      }
    }),
  );
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <h1>Letter from {currentPost.from}</h1>
      </div>

      <div className={classes.root}>
        <Box
          border={1}
          borderRadius="borderRadius"
          width={"75%"}
          height={"75%"}
          mx={"auto"}
          fontSize={24}>
          {currentPost?.message}
          {currentPost?.photoURL}
        </Box>
      </div>

      <div>
        <Grid
          container
          spacing={0}
          justify={"space-evenly"} >

          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={CreateIcon}
              onClick={buttonAction[0]}
            >
              {buttonText[0]}
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={MailIcon}
              onClick={buttonAction[1]}
            >
              {buttonText[1]}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default GrandparentLayout;