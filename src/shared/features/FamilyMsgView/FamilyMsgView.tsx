import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {Card, Modal, CardContent, CardActions, Paper, Typography, Grid, Container, Button, Tooltip} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Post } from 'shared/models/post.model';
import { getLinkedAccounts } from "services/accountLink";
import { deletePost, getPostById } from "services/post";
import { getRepliesToPost, markReplyRead } from "services/reply";
import { Reply } from "../../models/reply.model";
import { replyEmojiPNGs } from "../../../Icons";
import ManageConfirmDelete from "./ManageConfirmDelete";
import NewFamilyPost from "../NewFamilyPost/NewFamilyPost";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Column from 'shared/components/Column/Column';
import Row from 'shared/components/Row/Row';
import Child from 'shared/components/Child/Child';

import Moment from 'react-moment';

import './FamilyMsgView.css';
import { AccountLink } from 'shared/models/accountLink.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editModal: {
      position: 'absolute',
      width: '75%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: "scroll",
      maxHeight: '95%'
    },
    paper: {
        minHeight: 300
    },
    spacing: {
        margin: '5px'
    },
    message: {
        margin: '10px',
        maxWidth: '95%'
    },
    bottomMargin: {
        marginBottom: '10px'
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
    postId: string
}

const FamilyMsgView: React.FC<IFamilyMsgView> = (props) => {
    const classes = useStyles();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [post, setPost] = useState<Post>();
    const [receivers, setReceivers] = useState<AccountLink[]>([]);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [repliesSet, setRepliesSet] = useState<boolean>(false);
    const [emojiReplies, setEmojiReplies] = useState<Array<Array<string>>>();
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);
    const [editPost, setEditPost] = useState(false);

    const emojiIcons = replyEmojiPNGs();
    let history = useHistory();

    const sortNames = (a: any, b: any) => {
        if (a.displayName.toUpperCase() < b.displayName.toUpperCase()) {
            return -1;
        }
        if (a.displayName.toUpperCase() > b.displayName.toUpperCase()) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        //Get post from id
        let id = props.location.state.postId;
        getPostById(id).then((returnedPost) => {
            setPost(returnedPost);
        });
    }, [props.location.state.postId]); // fires on page load if this is empty [] 

    useEffect(() => {
        if (post) {
            getLinkedAccounts()
                .then((linkedAccounts) => {
                    let rcvrs = linkedAccounts.filter(account => post.receiverIDs.some(id => {
                        return (id === account.id && account.verified === true);
                    }));
                    setReceivers(rcvrs.sort(sortNames));
                });

            getRepliesToPost(post.pid).then((replyArray: any) => {
                let replies: Reply[];
                replies = [];
                let emojiReplies: Array<Array<string>>;
                emojiReplies = [[], [], [], [], [], []];
                for (let i = 0; i < replyArray.length; i++) {
                    markReplyRead(replyArray[i].rid);
                    if (replyArray[i].replyType === "emoji") {
                        for (let j = 0; j < replyArray[i].message.length; j++) {
                            let emojiIndex = replyArray[i].message[j];
                            emojiReplies[emojiIndex].push(replyArray[i].from);
                        }
                    } else {
                        replies.push(replyArray[i]);
                    }
                }
                setReplies(replies);
                setRepliesSet(true);
                setEmojiReplies(emojiReplies);
            });
        }
    }, [post]);

    const handleEditModal = () => {
        setEditModalOpen(!editModalOpen);
        setEditPost(!editPost);
    }

    const doneEditing = (newPost: Post) => {
        handleEditModal();
        setPost(newPost);
    }

    const handleConfirmDeleteModalClose = () => {
        setConfirmDeleteModalOpen(false);
    }

    const onClickDelete = () => {
        setConfirmDeleteModalOpen(true);
    }

    const deleteCurrentPost = () => {
        if (post) {
            setConfirmDeleteModalOpen(false);
            deletePost(post.pid);
            history.push('/posts')
        }
    }

    const messageAsString = (reply: Reply) => {
        return reply.message as string;
    }

    const isMessage = (reply: Reply) => {
        return (reply.replyType === "voice" && typeof reply.message === "string"); 
    }

    const isPhoto = (reply: Reply) => {
        return (reply.replyType === "photo" && typeof reply.message === "string");
    }

    const getTooltip = (reply: Array<string>) => {
        return (
            <React.Fragment>
                {reply.map((reply, index: number) => {
                    return (
                        <Typography key={index}>{reply}</Typography>
                    )
                })}
            </React.Fragment>
          );
    }
    if (post) {
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
                        <Typography variant="body1" className={[classes.message, "wrapReply"].join(' ')}>
                            {post.message}
                        </Typography>
                    </Column>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={12} className="padLeft">
                <Column justify="center" alignItems="center">
                    <Typography variant="caption" align="center">
                        Sent <Moment format="MMMM Do YYYY, h:mm a">{post.date}</Moment>
                        <br/>
                        <br/>
                        Seen by:
                    </Typography>
                    {
                        receivers.map((receiver: AccountLink, index: number) => {
                            return (
                            <Grid container alignItems={receivers.length === 1 ? "center" : "flex-start"} justify={receivers.length === 1 ? "center" : "flex-start"} key={index}>
                                {post.read[receiver.id] === true ? <CheckBoxIcon fontSize="small"/> : <CheckBoxOutlineBlankIcon fontSize="small"/>}
                                <Typography variant="caption" align="center">
                                    {receiver.displayName}
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
                        color="secondary"
                        className={classes.spacing}
                        startIcon={<EditIcon />}
                        onClick={handleEditModal}>
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
            <Row alignItems="center" justify="center">
                {emojiReplies && emojiReplies.map((reply, index: number) => {
                    return reply.length > 0 && (
                        <Tooltip title={getTooltip(reply)} key={index} arrow>
                            <img
                                src={emojiIcons[index]}
                                className="emojiReply"
                                alt="Emoji reply"
                            />
                        </Tooltip>
                    )
                })}
            </Row>
            <Grid container className={classes.bottomMargin}>
                {
                replies.map((reply: Reply, index: number) => {
                    return (
                    <Child xs={12} key={index}>
                        <div className="postStyle">
                            <Card variant="outlined" className="replyCard">
                                <CardContent className="replyContent">
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
                                <CardActions className="replyActions">
                                    <Typography variant="caption">
                                        Sent by {reply.from}
                                        <br/>
                                        <Moment format="MMMM Do YYYY, h:mm a">{reply.date}</Moment>
                                    </Typography>
                                </CardActions>
                            </Card>
                        </div>
                    </Child>
                    )
                })
                }
            </Grid>
            {(repliesSet && replies.length === 0) &&
                <Typography variant="caption" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    You have no message or photo replies to this post.
                </Typography>
            }
            <Modal open={editModalOpen} onClose={handleEditModal} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div className={classes.editModal}>
                {editPost && <NewFamilyPost currentPost={post} closeModal={doneEditing}/>}
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
    } else {
        return (
            <>
            Post not found.
            </>
        )
    }
};

export default FamilyMsgView;