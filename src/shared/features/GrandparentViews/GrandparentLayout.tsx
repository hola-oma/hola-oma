// https://stackoverflow.com/questions/58708542/how-to-properly-update-state-with-firebase-and-useeffect

import React, {useState} from 'react';

import { Post } from 'shared/models/post.model';

// import './GrandparentLayout.css';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Box, Button, SvgIconProps} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import {SvgIconComponent} from "@material-ui/icons";

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

interface IGrandparentLayout {
  post: Post;
  buttonText: Array<string>;
  buttonActions: { (): void; } []   //  Array of functions
  buttonIcons: React.ReactElement<SvgIconProps>[]
}

export const GrandparentLayout: React.FC<IGrandparentLayout> = ({ post , buttonText,  buttonActions, buttonIcons}) => {

  const classes = useStyles();
  const [currentMsgModalOpen, setCurrentMsgModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={classes.title}>
        <h1>Letter from {post?.from}</h1>
      </div>

      {/*Box for message content*/}
      <div className={classes.root}>
        <Box
          border={1}
          borderRadius="borderRadius"
          width={"75%"}
          height={"75%"}
          mx={"auto"}
          fontSize={24}>
          {post?.message} <br/> <br/>
          {post?.photoURL}
        </Box>
      </div>

      {/*Grid for bottom buttons*/}
      <div>
        <Grid
          container
          spacing={0}
          justify={"space-evenly"} >

          {/*Button 1*/}
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={buttonIcons[0]}
              onClick={buttonActions[0]}
            >
              {buttonText[0]}
            </Button>
          </Grid>

          {/*Button 2*/}
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={buttonIcons[1]}
              onClick={buttonActions[1]}
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