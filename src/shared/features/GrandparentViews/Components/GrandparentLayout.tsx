import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Box, Button, SvgIconProps, Typography} from '@material-ui/core';
import {Alert} from "@material-ui/lab";

import Column from 'shared/components/Column/Column';

const boxDimensions = {
  height: 486,   // 16:9 ratio
  width: 864
}

export const buttonText = {
  // Navigation
  inbox: "Go back to Inbox",
  replyOptions: "Go back to Reply Options",
  backToMessage: "Go back to Message",
  // Reply options
  smiley: "Smiley",
  voice: "Voice Message",
  photo: "Your Picture",
  send: "Send Reply",
  // Photo options
  take: "Take Photo",
  retake: "Retake Photo",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
      textAlign: 'center',
    }
  }),
);

interface IGrandparentLayout {
  from?: string,
  headerText?: string;
  header2Text?:string;
  alertText?: string | null;
  boxContent: any;
  buttonText: Array<string>;
  buttonActions: { (arg0: any): void } [];   //  Array of functions
  buttonIcons: React.ReactElement<SvgIconProps>[];
  buttonDisabled?: boolean[];
}

export const GrandparentLayout: React.FC<IGrandparentLayout> = ({ from, headerText, header2Text, alertText, boxContent, buttonText,  buttonActions, buttonIcons, buttonDisabled = [] }) => {

  const classes = useStyles();

  return (
    <Column justify="center">

      {/*Header*/}
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4" gutterBottom>{headerText} {from}</Typography>
        { header2Text && <Typography variant="h5" align={"center"}>{header2Text}</Typography> }
      </Grid>

      {/*Alert*/}
      {alertText &&  <Alert className="error" severity="error">{alertText}</Alert>}
      
        {/*Content Box*/}
        <Grid item xs={12} className={classes.root}>
          <Box
            border={1}
            borderRadius="borderRadius"
            mx={"auto"}
            fontSize={24}
            display={"flex"}
            height={boxDimensions.height}
            width={boxDimensions.width}
          >
          {boxContent}
        </Box>
      </Grid>

      {/*Bottom buttons*/}
      {buttonIcons.length > 0 &&
          <Grid container
                direction="row"
                justify="space-around"
                alignItems="center">
            {buttonIcons.map((button: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={buttonIcons[index]}
                  onClick={buttonActions[index]}
                  disabled={buttonDisabled[index]}
                  key={index}
                >
                  {buttonText[index]}
                </Button>
              )
            })}
          </Grid>
      }
    </Column>
)}

export default GrandparentLayout;