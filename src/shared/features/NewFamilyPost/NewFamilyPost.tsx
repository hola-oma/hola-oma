import React, { useState } from 'react';

import { Box, TextField, Button } from '@material-ui/core';

import './NewFamilyPost.css';

const NewFamilyPost: React.FC = () => {
    const [selectedFile, onSelect] = useState<File | null>();
    const [textValue, updateTextValue] = useState("");

    const submitPost = async (e: any) => {
        e.preventDefault();
    
        // To be implemented
      };

    return (
        <>
        <form noValidate onSubmit={e => submitPost(e)}>
        <Box>
            <input
                type="file"
                onChange={(event) => onSelect(event.target.files ? event.target.files[0] : null)} />
        </Box>
        <TextField
            multiline
            fullWidth
            margin="normal"
            rows="10"
            variant="outlined"
            label="Type a Message"
            value={textValue}
            onChange={e => updateTextValue(e.target.value)}/>
        <Button
            type="submit"
            variant="contained">
            Send Post
        </Button>
        </form>
     </>
    )
};

export default NewFamilyPost;