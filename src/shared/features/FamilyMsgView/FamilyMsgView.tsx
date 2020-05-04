import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {Box, Card, Modal, CardContent, Paper, Typography, Grid, Container, Button} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Post } from 'shared/models/post.model';
import { getLinkedAccounts } from "services/accountLink";
import { deletePost } from "services/post";
import { getRepliesToPost, markReplyRead } from "services/reply";
import { Reply } from "../../models/reply.model";
import { replyEmojiArray } from "../../../Icons";
import ModalReply from "./ModalReply";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Moment from 'react-moment';

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
        height: 300,
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

interface IReceiver {
    id: string
    name: string
}

const FamilyMsgView: React.FC<IFamilyMsgView> = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const post = props.location.state.post;
    const [modalReply, setModalReply] = useState<Reply>();
    const [receivers, setReceivers] = useState<IReceiver[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const emojiIcons = replyEmojiArray();
    let history = useHistory();

    useEffect(() => {
        //Get connected accounts to populate receiver list
        getLinkedAccounts()
        .then((linkedAccounts) => {
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
        getRepliesToPost(post.pid).then((replyArray: any) => {
            setReplies(replyArray);
            for (let i = 0; i < replyArray.length; i++) {
                markReplyRead(replyArray[i].rid);
            }
        });
    }, []); // fires on page load if this is empty [] 

    const handleClick = (reply: Reply) => {
        setModalOpen(!modalOpen);
        if (reply) {
            setModalReply(reply);
        }
    }

    const deleteCurrentPost = () => {
        // To do: Add confirm modal
        deletePost(post.pid);
        history.push('/posts')
    }

    const messageAsArray = (reply: Reply) => {
        return reply.message as number[];
    }
    
    const isEmoji = (reply: Reply) => {
        return (reply.replyType === "emoji" && typeof reply.message !== "string");
    }

    return (
        <>
        <Container>
            <Typography component="h2" variant="h5">
                Sent Message
            </Typography>
        </Container>
        <Grid container alignItems="center">
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Paper>
                    {post.photoURL && <img
                        src={post.photoURL}
                        alt="Attached img"
                    />}
                    <Typography variant="h5">
                        {post.message}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="subtitle2">
                    Sent <Moment format="MMMM Do YYYY, h:mm a">{post.date}</Moment>
                    <br/>
                    <br/>
                    Seen by:
                </Typography>
                {
                    receivers.map((receiver: IReceiver, index: number) => {
                        return (
                        <Grid container alignItems="center" justify="center" key={index}>
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
                <br/>
                <br/>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    disabled>
                    Edit Post
                </Button>
                <br/>
                <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={deleteCurrentPost}>
                    Delete Post
                </Button>
            </Grid>
        </Grid>
        <Container>
            <hr />
            <Typography component="h2" variant="h5">
                Replies
            </Typography>
                <Grid container spacing={2}>
                {
                replies.map((reply: Reply, index: number) => {
                    return (
                    <Grid item xs={4} key={index}>
                        <div>
                        <div onClick={()=>handleClick(reply)}>
                        <Card variant="outlined">
                            <CardContent>
                                {isEmoji(reply) &&
                                    messageAsArray(reply).map((emojiIndex: number, replyIndex: number) => {
                                        return (
                                            <Typography variant="h5" key={replyIndex}>
                                                {emojiIcons[emojiIndex]}
                                            </Typography>
                                        )
                                    })
                                }
                                <Typography variant="subtitle2">
                                    Sent by {reply.from}
                                    <br/>
                                    <Moment format="MMMM Do YYYY, h:mm a">{reply.date}</Moment>
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
                {modalReply && <ModalReply reply={modalReply}/>}
            </div>
            </Modal>
        </Container>

        <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Break out seen by by individual receiver "read" receipts - After post model has been changed to accommodate.</li>
                <li>Edit/delete options?</li>
                <li>Send a short video</li>
            </ul>
        </Box>
     </>
    )
};

export default FamilyMsgView;