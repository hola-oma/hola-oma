import React from 'react';

import {Box} from '@material-ui/core';

import './FamilyMsgView.css';

const FamilyMsgView: React.FC = () => {

    return (
        <>

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