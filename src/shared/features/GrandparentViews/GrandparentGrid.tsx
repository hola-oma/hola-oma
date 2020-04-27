import {Card, CardHeader,CardContent, Grid, SvgIconProps} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

interface IGrandparentGrid {
  icons: React.ReactElement<SvgIconProps>[];
  onClick: () => void;
  choicesList?: boolean;
}

// todo: pass in Inbox posts OR just delete this file at end of project if not in use
// https://stackoverflow.com/questions/51629491/how-to-properly-type-an-array-map-callback-in-typescript

const GrandparentGrid: React.FC<IGrandparentGrid> = ({ icons, onClick, choicesList}) => {

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

    let choicesArray = [];
    if (choicesList) {
      onClick = () => console.log("gonna select buttons");
      choicesArray.push("pushed");
      choicesArray.forEach(choice => console.log(choice));
    }

    const [chosen, setChosen] = useState();

    return (
      <>

        <Grid container>
          {
            icons.map( (icon: React.ReactElement<SvgIconProps>, index: number) => {
              return (
                <div
                  className={"inboxCard"}
                  key={index}
                  onClick={onClick}
                >
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