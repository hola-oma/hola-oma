import React from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, SvgIconProps, Typography} from '@material-ui/core';
import {Alert} from "@material-ui/lab";

import ViewWrapper from 'shared/components/ViewWrapper';
import Child from 'shared/components/Child/Child';

export const boxDimensions = {
  height: '80vh',   // 16:9 ratio, was 486 at first 
  width: '80vw'  // was 864
}

export const buttonText = {
  // Navigation
  inbox: "Back to Inbox",
  replyOptions: "Go Back",
  backToMessage: "Go Back",
  // Reply options
  smiley: "Smiley",
  voice: "Message",
  photo: "Photo",
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

export const GrandparentLayout: React.FC<IGrandparentLayout> = ({ from, headerText, alertText, boxContent, buttonText,  buttonActions, buttonIcons, buttonDisabled = [] }) => {

  const classes = useStyles();

  return (
    <ViewWrapper>
      
      {/*Header*/}
      <Child xs={12} className={classes.title} style={{flexBasis: 0}}>
        <Typography variant="h5">{headerText} {from}</Typography>
      </Child>

      {/*Alert*/}
      {alertText &&  <Alert className="error" severity="error">{alertText}</Alert>}
      
        {/*Content Box*/}
        <Child xs={12} className={classes.root}>
          <Box
            id="grandparentLayout-Box"
            className="grandparentBox grandparentBoxWidth grandparentBoxHeight"
            borderRadius="borderRadius"
            mx={"auto"}
            fontSize={20}
            display={"flex"}
            style={{height: '100%'}}
          >
          {boxContent}
        </Box>
      </Child>

      {/*Bottom buttons*/}
      <div id="button-wrapper">
      {buttonIcons.length > 0 &&
          <Child container
              className="grandparentBoxWidth marginLRAuto grandparentOptionsButtons"
              justify="space-between"
              alignItems="center"
          >
            {buttonIcons.map((button: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  className={`bigButton grandparentOptionsButton`}
                  startIcon={buttonIcons[index]}
                  onClick={buttonActions[index]}
                  disabled={buttonDisabled[index]}
                  key={index}
                  style={{height: '100px'}}
                >
                  {buttonText[index]}
                </Button>
              )
            })}
          </Child>
        }
      </div>
    </ViewWrapper>
)}

export default GrandparentLayout;