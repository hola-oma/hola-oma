import React from 'react';

import {Box} from '@material-ui/core';

import './NewFamilyPost.css';

const NewFamilyPost: React.FC = () => {

    return (
        <>

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Photo/Video file selection</li>
                <li>Text field</li>
                <li>Send post to database</li>
            </ul>
        </Box>
     </>
    )
};

export default NewFamilyPost;