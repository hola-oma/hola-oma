import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router";

import { Box, TextField, Button } from '@material-ui/core';
import {createPost, updatePostID, uploadFile} from "services/post";
import { getUserProfile } from "services/user";

import './NewFamilyPost.css';

const NewFamilyPost: React.FC = () => {
    const [selectedFile, onSelect] = useState<File | null>();
    const [textValue, updateTextValue] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userId, setUserId] = useState("");
    const history = useHistory();

    const submitPost = async (e: any) => {
        e.preventDefault();
        let post = {creatorID: userId, from: displayName, message: textValue, photoURL: "", read: false, date: new Date().getTime(), receiverIDs: ["xyz789"]};

        if (selectedFile) {
            const fileURL = await uploadFile(selectedFile);
            if (fileURL) {
                post.photoURL = fileURL;
            }
        }
    
        try {
            const postSent = await createPost(post);
            if (postSent) {
                console.log("success sending post!");
                await updatePostID(postSent);       // Add post id to new post document
            }
            if (history) history.push('/posts');
          } catch(e) {
            console.error(e.message);
          }
      };

    useEffect(() => {
        getUserProfile()
        .then((userProfile:any) => {
            console.log(userProfile);
            setDisplayName(userProfile.displayName);
            setUserId(userProfile?.uid);
        });
    }, []); // fires on page load if this is empty [] 

    return (
        <>
        <form className="newFamilyPostForm" noValidate onSubmit={e => submitPost(e)}>
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