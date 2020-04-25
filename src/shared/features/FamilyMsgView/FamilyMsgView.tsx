import React, { useState, useEffect } from 'react';

import {Box, Card, Modal, CardContent, CardMedia, Typography, Grid} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Post } from 'shared/models/post.model';
import { getLinkedAccounts } from "services/accountLink";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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

interface IReceiver {
    id: string
    name: string
}

const FamilyMsgView: React.FC<IFamilyMsgView> = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const post = props.location.state.post;
    const [modalReply, setModalReply] = useState<IReply>();
    const [receivers, setReceivers] = useState<IReceiver[]>([]);

    useEffect(() => {
        //Get connected accounts to populate receiver list
        getLinkedAccounts()
        .then((linkedAccounts) => {
            console.log(linkedAccounts);
            let rcvrs = [];
            for (let i = 0; i < linkedAccounts.length; i++) {
                if (linkedAccounts[i].verified === true) {
                    let displayName = linkedAccounts[i].displayName ? linkedAccounts[i].displayName : "Unknown Username";
                    let receiver = {
                        id: linkedAccounts[i].id,
                        name: displayName};
                    rcvrs.push(receiver);
                }
            }
            setReceivers(rcvrs);
        });
    }, []); // fires on page load if this is empty [] 

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
        <Grid container alignItems="center">
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Card variant="outlined">
                    <CardContent>
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
            </Grid>
            <Grid item xs={3}>
                <Typography variant="subtitle2">
                    Sent message {getDateAsString(post.date)}
                    <br/>
                    <br/>
                    Seen by:
                </Typography>
                {
                    receivers.map((receiver: IReceiver, index: number) => {
                        return (
                        <Grid container alignItems="center" justify="center">
                            <Grid item>
                                {post.read === true ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    {receiver.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>

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
                <li>Display responses associated with this post.</li>
                <li>Break out seen by by individual receiver "read" receipts - After post model has been changed to accommodate.</li>
                <li>Edit/delete options?</li>
            </ul>
        </Box>
     </>
    )
};

export default FamilyMsgView;