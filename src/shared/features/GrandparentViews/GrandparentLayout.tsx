import React, {useContext} from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, Box, Button, SvgIconProps} from '@material-ui/core';
import {GrandparentPostContext} from "../../../App";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(5),
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
  headerText: string;
  header2Text?:string;
  alertText?: string | null;
  boxContent: any;
  buttonText: Array<string>;
  buttonActions: { (): void } []   //  Array of functions
  buttonIcons: React.ReactElement<SvgIconProps>[]
}

export const GrandparentLayout: React.FC<IGrandparentLayout> = ({ headerText, header2Text, alertText, boxContent, buttonText,  buttonActions, buttonIcons}) => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;

  return (
    <>
      <div className={classes.title}>
        <h1>{headerText} {FamilyPost?.from}</h1>
        { header2Text && <h2>{header2Text}</h2> }
      </div>

      {alertText &&  <Alert className="error" severity="error">{alertText}</Alert>}

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

      {/*Div for bottom buttons*/}
      {buttonIcons.length > 0 &&
        <div className={classes.button}>
          <Grid container justify={'space-between'}>
          {buttonIcons.map((button: React.ReactElement<SvgIconProps>, index: number) => {
            return (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={buttonIcons[index]}
                onClick={buttonActions[index]}
                key={index}
              >
                {buttonText[index]}
              </Button>
            )
          })}
          </Grid>
        </div>
      }
      </>
)}

export default GrandparentLayout;