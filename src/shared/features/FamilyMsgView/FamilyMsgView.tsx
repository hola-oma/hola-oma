import React, { useState } from 'react';

import {Box, Card, Modal} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
  }),
);

const FamilyMsgView: React.FC = () => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

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