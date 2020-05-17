import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {Card, Modal, CardContent, CardActions, Paper, Typography, Grid, Container, Button} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Post } from 'shared/models/post.model';
import { getLinkedAccounts } from "services/accountLink";
import { deletePost } from "services/post";
import { getRepliesToPost, markReplyRead } from "services/reply";
import { Reply } from "../../models/reply.model";
import { replyEmojiArray } from "../../../Icons";
import ModalReply from "./ModalReply";
import ManageConfirmDelete from "./ManageConfirmDelete";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Column from 'shared/components/Column/Column';

import Moment from 'react-moment';

import './FamilyMsgView.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      width: '50%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    paper: {
        minHeight: 300
    },
    postStyle: {
      height: "100%"
    },
    spacing: {
        margin: '5px'
    },
    message: {
        margin: '10',
        width: '100%'
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
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

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
    }, [post.pid]); // fires on page load if this is empty [] 

    const handleClick = (reply: Reply) => {
        setModalOpen(!modalOpen);
        if (reply) {
            setModalReply(reply);
        }
    }

    const handleConfirmDeleteModalClose = () => {
        setConfirmDeleteModalOpen(false);
    }

    const onClickDelete = () => {
        setConfirmDeleteModalOpen(true);
    }

    const deleteCurrentPost = () => {
        setConfirmDeleteModalOpen(false);
        deletePost(post.pid);
        history.push('/posts')
    }

    const messageAsArray = (reply: Reply) => {
        return reply.message as number[];
    }

    const messageAsString = (reply: Reply) => {
        return reply.message as string;
    }
    
    const isEmoji = (reply: Reply) => {
        return (reply.replyType === "emoji" && typeof reply.message !== "string");
    }

    const isMessage = (reply: Reply) => {
        return (reply.replyType === "voice" && typeof reply.message === "string"); 
    }

    const isPhoto = (reply: Reply) => {
        return (reply.replyType === "photo" && typeof reply.message === "string");
    }

    return (
        <>
        <Container>
            <Typography component="h2" variant="h5" align="center">
                Sent Message
            </Typography>
        </Container>
        <Grid container alignItems="center">
            <Grid item sm={3}></Grid>
            <Grid item sm={6} xs={12}>
                <Paper className={classes.paper}>
                    <Column justify="center" alignItems="center">
                        {post.photoURL && <img
                            src={post.photoURL}
                            className="photo"
                            alt="Attached img"
                        />}
                        {post.videoURL && <video
                            src={post.videoURL}
                            preload="auto"
                            controls
                            className="photo"
                        />}
                        <br/>
                        <Typography variant="h5" className={[classes.message, "wrapReply"].join(' ')}>
                            {post.message}
                        </Typography>
                    </Column>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Column justify="center" alignItems="center">
                    <Typography variant="caption" align="center">
                        Sent <Moment format="MMMM Do YYYY, h:mm a">{post.date}</Moment>
                        <br/>
                        <br/>
                        Seen by:
                    </Typography>
                    {
                        receivers.map((receiver: IReceiver, index: number) => {
                            return (
                            <Grid container alignItems="center" justify="center" key={index}>
                                {post.read[receiver.id] === true ? <CheckBoxIcon fontSize="small"/> : <CheckBoxOutlineBlankIcon fontSize="small"/>}
                                <Typography variant="caption" align="center">
                                    {receiver.name}
                                </Typography>
                            </Grid>
                            )
                        })
                    }
                    <br/>
                    <br/>
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.spacing}
                        startIcon={<EditIcon />}
                        disabled>
                        Edit Post
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        className={classes.spacing}
                        startIcon={<DeleteIcon />}
                        onClick={onClickDelete}>
                        Delete Post
                    </Button>
                </Column>
            </Grid>
        </Grid>
        <Container>
            <hr />
            <Typography component="h2" variant="h5" align="center">
                Replies
            </Typography>
                <Grid container spacing={2}>
                {
                replies.map((reply: Reply, index: number) => {
                    return (
                    <Grid item xs={4} key={index}>
                        <div className={"postStyle"} onClick={()=>handleClick(reply)}>
                            <Card variant="outlined" className={"postStyle"}>
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

                                    {isMessage(reply) && 
                                        <p>{reply.message}</p>
                                    }

                                    {isPhoto(reply) &&
                                        <img
                                            src={messageAsString(reply)}
                                            className="photo"
                                            alt="Reply img"
                                        />
                                    }
                                </CardContent>
                                <CardActions>
                                    <Typography variant="caption">
                                        Sent by {reply.from}
                                        <br/>
                                        <Moment format="MMMM Do YYYY, h:mm a">{reply.date}</Moment>
                                    </Typography>
                                </CardActions>
                            </Card>
                        </div>
                    </Grid>
                    )
                })
                }
            </Grid>
            <Modal open={modalOpen} onClose={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div className={classes.modal}>
                {modalReply && <ModalReply reply={modalReply}/>}
            </div>
            </Modal>
        </Container>

        <ManageConfirmDelete 
            isOpen={confirmDeleteModalOpen} 
            deleteConfirmed={() => deleteCurrentPost()}
            onClose={handleConfirmDeleteModalClose} 
        />
     </>
    )
};

export default FamilyMsgView;