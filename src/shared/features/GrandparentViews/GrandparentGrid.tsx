import {Card, CardHeader,CardContent, Grid, SvgIconProps} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

interface IGrandparentGrid {
  icons: React.ReactElement<SvgIconProps>[];
}

// todo: pass in Inbox posts

const GrandparentGrid: React.FC<IGrandparentGrid> = ({ icons}) => {

    const useStyles = makeStyles({
      root: {
      minWidth: 250,
      maxWidth: 250
    },
      bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
      title: {
      fontSize: 16,
    },
      pos: {
      marginBottom: 12,
    },
    });
    const classes = useStyles();

    return (
      <>

        <Grid container>
          {
            icons.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <div className={"inboxCard"} key={index} onClick={() => console.log("clicked")}>
                  <Card className={classes.root} variant="outlined">
                    <CardHeader
                      title="">
                    </CardHeader>
                    <CardContent>
                      {icon}
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
        </Grid>

      </>
    )



}

export default GrandparentGrid;