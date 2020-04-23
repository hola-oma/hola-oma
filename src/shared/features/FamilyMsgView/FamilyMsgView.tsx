import React, { useState, useEffect } from 'react';

import {Box, Card, Modal, CardContent, CardMedia, Typography, Container, Grid} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Post } from 'shared/models/post.model';
import { getUserDataByID } from "services/user";

import './FamilyMsgView.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
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
    media: {
        height: 750,
        maxWidth: "100%"
    }
  })
);

interface IFamilyMsgView {
    location: ISubProps
}

interface ISubProps {
    state: ISubSubProps
}

interface ISubSubProps {
    post: Post
}

//For testing - update with actual format
interface IReply {
    message: string,
    creatorId: string,
    date: number,
    read: boolean,
    responseTo: string,
    creatorName: string
}

const FamilyMsgView: React.FC<IFamilyMsgView> = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const post = props.location.state.post;
    const [modalReply, setModalReply] = useState<IReply>();

    const handleClick = (reply: IReply) => {
        setModalOpen(!modalOpen);
        if (reply) {
            setModalReply(reply);
        }
    }

    const getDateAsString = function(postDate: number) {
        let date = new Date(postDate).toString()
        return date.substring(0, 21);
    }

    const mockReplies = [
        {message: "Hello", creatorId: "pfvIc4RIGmRz1gyqMxsHuLW5mNA3", date: 1587597619986, read: false, responseTo: "sITkY10bItkczjAHkkUJ", creatorName: "Kristin Grandparent Test"},
        {message: "Thanks", creatorId: "pfvIc4RIGmRz1gyqMxsHuLW5mNA3", date: 1587597619986, read: false, responseTo: "sITkY10bItkczjAHkkUJ", creatorName: "Kristin Grandparent Test"}
    ]

    return (
        <>
        <Container>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="subtitle2">
                        Sent Message
                    </Typography>
                    {post.photoURL && <CardMedia
                        component="img"
                        className={classes.media}
                        image={post.photoURL}
                    />}
                    <Typography variant="h5">
                        {post.message}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
        <Typography variant="subtitle2">
            Sent message {getDateAsString(post.date)}
            <br/>
        </Typography>

        <Typography variant="h3">
            Replies
        </Typography>

            <Grid container spacing={2}>
            {
            mockReplies.map((reply: IReply, index: number) => {
                return (
                <Grid item xs={4} key={index}>
                    <div>
                    <div onClick={()=>handleClick(reply)}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5">
                                {reply.message}
                            </Typography>
                            <Typography variant="subtitle2">
                                Sent by {reply.creatorName}
                                <br/>
                                {getDateAsString(reply.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                    </div>
                </Grid>
                )
            })
            }
        </Grid>
        <Modal open={modalOpen} onClose={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className={classes.paper}>
            {modalReply && modalReply.message}
        </div>
        </Modal>

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Display responses</li>
                <li>Seen by with checkmark icons and receiver list</li>
                <li>Edit/delete options?</li>
            </ul>
        </Box>
     </>
    )
};

export default FamilyMsgView;