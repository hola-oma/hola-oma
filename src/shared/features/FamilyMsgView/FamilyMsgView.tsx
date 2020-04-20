import React, { useState } from 'react';

import {Box, Card, Modal, CardContent, CardMedia, Typography, Container} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Post } from 'shared/models/post.model';

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
        height: 500
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

const FamilyMsgView: React.FC<IFamilyMsgView> = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const post = props.location.state.post;

    const handleClick = () => {
        setModalOpen(!modalOpen);
    }

    const getDateAsString = function(postDate: number) {
        let date = new Date(postDate).toString()
        return date.substring(0, 21);
    }

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

        <div className={"postCard"} onClick={handleClick}>
            <Card variant="outlined">
                Placeholder for response
            </Card>
        </div>
        <Modal open={modalOpen} onClose={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div className={classes.paper}>Insert full display of grandparent response here.</div>
        </Modal>

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Display responses</li>
                <li>Modal on response click</li>
                <li>Seen by with checkmark icons and receiver list</li>
                <li>Edit/delete options?</li>
            </ul>
        </Box>
     </>
    )
};

export default FamilyMsgView;