import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Box, Button, SvgIconProps, Typography} from '@material-ui/core';
import {Alert} from "@material-ui/lab";

import Column from 'shared/components/Column/Column';

export const boxDimensions = {
  height: '80vh',   // 16:9 ratio, was 486 at first 
  width: '80vw'  // was 864
}

export const buttonText = {
  // Navigation
  inbox: "Back to Inbox",
  replyOptions: "Back to Reply Options",
  backToMessage: "Back to Message",
  // Reply options
  smiley: "Smiley",
  voice: "Voice Message",
  photo: "Your Picture",
  send: "Send",
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
  from: string,
  headerText: string;
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
        <Typography variant="h5">{headerText} {from}</Typography>
        {/* MB: Commented out header2 text in effort to fit everything on ipad 
        { (header2Text && !alertText) && <Typography variant="h5" align={"center"}>{header2Text}</Typography> }
        */} 
      </Grid>

      {/*Alert*/}
      {alertText &&  <Alert className="error" severity="error">{alertText}</Alert>}
      
        {/*Content Box*/}
        <Grid item xs={12} className={classes.root}>
          <Box
            id="grandparentLayout-Box"
            className="grandparentBoxWidth grandparentBoxHeight"
            border={1}
            borderRadius="borderRadius"
            mx={"auto"}
            fontSize={20}
            display={"flex"}
          >
          {boxContent}
        </Box>
      </Grid>

      {/*Bottom buttons*/}
      {buttonIcons.length > 0 &&
          <Grid container
              className="grandparentBoxWidth marginLRAuto"
              direction="row"
              justify="space-between"
              alignItems="center">
            {buttonIcons.map((button: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  className={`${classes.button} bigButton grandparentOptionsButton`}
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