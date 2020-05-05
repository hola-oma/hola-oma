import React, {useContext} from 'react';

import {Card, CardActionArea, CardContent, CardMedia, Dialog, Grid, Typography} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import GrandparentLayout from "../../GrandparentLayout";
import {GrandparentPostContext} from "../../../../../App";
import {makeStyles} from "@material-ui/core/styles";

interface ICurrentMsgModal {
  isOpen: boolean;
  returnToInbox: () => void;
  replyToMessage: () => void;
}

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

const CurrentMsgModal: React.FC<ICurrentMsgModal> = ( { isOpen , replyToMessage, returnToInbox}) => {

  const classes = useStyles();
  const FamilyPost = useContext(GrandparentPostContext).post;

  // todo: Fix - "Warning: findDOMNode is deprecated in StrictMode.... "
  return (
    <Dialog fullScreen
            open={isOpen}
            onClose={returnToInbox}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

      <GrandparentLayout
        headerText={"Letter from "}
        boxContent={
          <Grid container justify="space-evenly">
            <Grid item xs={12}>
              <Card className={classes.root}>

                <CardActionArea>
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
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        }
        buttonText={["Go Back to All Messages", "Reply"]}
        buttonActions={[returnToInbox, replyToMessage]}
        buttonIcons={[<MailIcon/>, <CreateIcon/>]}
      />

    </Dialog>

  );

}

export default CurrentMsgModal;
