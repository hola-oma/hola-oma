import React, { useState } from 'react';

import {Box, Card, Modal, CardContent, CardHeader} from '@material-ui/core';

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

    return (
        <>
        <div className={"postCard"} onClick={handleClick}>
            <Card variant="outlined">
                Placeholder for response
            </Card>
        </div>
        <Modal open={modalOpen} onClose={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div className={classes.paper}>Insert full display of grandparent response here.</div>
        </Modal>

        <Card className={classes.root} variant="outlined">
            <CardHeader
                title={"Sent Message"}>
            </CardHeader>

            <CardContent>
                {post.message}
            </CardContent>
        </Card>

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Display original message</li>
                <li>Display responses</li>
                <li>Modal on response click</li>
                <li>Edit/delete options?</li>
            </ul>
        </Box>
     </>
    )
};

export default FamilyMsgView;