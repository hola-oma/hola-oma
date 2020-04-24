import React, {useContext} from 'react';

import { Post } from 'shared/models/post.model';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Box, Button, SvgIconProps} from '@material-ui/core';
import {GrandparentPostContext} from "../../../App";

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
  // post: Post;
  headerText: string;
  boxContent: any;
  buttonText: Array<string>;
  buttonActions: { (): void; } []   //  Array of functions
  buttonIcons: React.ReactElement<SvgIconProps>[]
}

export const GrandparentLayout: React.FC<IGrandparentLayout> = ({ headerText, boxContent, buttonText,  buttonActions, buttonIcons}) => {

  const classes = useStyles();

  const FamilyPost = useContext(GrandparentPostContext).post;

  return (
    <>
      <div className={classes.title}>
        <h1>{headerText} {FamilyPost?.from}</h1>
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
          {boxContent}
        </Box>
      </div>

      {/*Grid for bottom buttons*/}
      {buttonIcons.length > 0 &&
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
      </div> }
    </>
)
}


export default GrandparentLayout;