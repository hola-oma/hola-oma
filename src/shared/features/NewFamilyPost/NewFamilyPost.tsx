import React, { useState } from 'react';

import {Box} from '@material-ui/core';

import './NewFamilyPost.css';

const NewFamilyPost: React.FC = () => {
    const [selectedFile, onSelect] = useState<File | null>();

    return (
        <>
        <Box>
            <input type="file" onChange={(event) => onSelect(event.target.files ? event.target.files[0] : null)}></input>
        </Box>
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