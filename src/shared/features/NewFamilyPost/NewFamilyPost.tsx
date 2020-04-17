import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router";

import { Box, TextField, Button, Checkbox } from '@material-ui/core';
import { createPost, uploadFile } from "services/post";
import { getUserProfile } from "services/user";

import './NewFamilyPost.css';

interface IReceiver {
    id: string
    name: string
    checked: boolean
}

const NewFamilyPost: React.FC = () => {
    const [selectedFile, onSelect] = useState<File | null>();
    const [textValue, updateTextValue] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userId, setUserId] = useState("");
    const [receivers, setReceivers] = useState<IReceiver[]>([]);
    const history = useHistory();

    const submitPost = async (e: any) => {
        e.preventDefault();
        let post = {creatorID: userId, from: displayName, message: textValue, photoURL: "", read: false, date: new Date().getTime(), receiverIDs: ["pfvIc4RIGmRz1gyqMxsHuLW5mNA3"]};

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
            }
            if (history) history.push('/posts');
          } catch(e) {
            console.error(e.message);
          }
      };

    const handleCheckboxes = (event: any, index: number) => {
        event.persist();
        let newArray = [...receivers];
        newArray[index].checked = event.target.checked;
        setReceivers(newArray);
    }

    useEffect(() => {
        getUserProfile()
        .then((userProfile:any) => {
            console.log(userProfile);
            setDisplayName(userProfile.displayName);
            setUserId(userProfile?.uid);
        });
        //Get connected accounts to populate receiver list
        let rcvrs = [{id: "pfvIc4RIGmRz1gyqMxsHuLW5mNA3", name: "Kristin Grandparent Test", checked: false}];
        setReceivers(rcvrs);
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
        Recipients
        <br/>
        {
            receivers.map((receiver: IReceiver, index: number) => {
                return (
                    <label key={receiver.id}>
                        {receiver.name}
                        <Checkbox name={receiver.id} checked={receiver.checked} onChange={e => handleCheckboxes(e, index)} />
                    </label>
                )
            })
        }
        <br/>
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