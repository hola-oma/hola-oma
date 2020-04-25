import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router";

import { Box, TextField, Button, Checkbox } from '@material-ui/core';
import { createPost, updatePostID, uploadFile } from "services/post";
import { getUserProfile } from "services/user";
import { getLinkedAccounts } from "services/accountLink";

import './NewFamilyPost.css';
// @ts-ignore
import Resizer from 'react-image-file-resizer';

interface IReceiver {
    id: string
    name: string
    checked: boolean
}

const NewFamilyPost: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<Blob | null>();
    const [textValue, updateTextValue] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userId, setUserId] = useState("");
    const [receivers, setReceivers] = useState<IReceiver[]>([]);
    const history = useHistory();

    const submitPost = async (e: any) => {
        e.preventDefault();
        let receiverIDs = [];
        for (let i = 0; i < receivers.length; i++) {
            receiverIDs.push(receivers[i].id);
        }

        let post = {
            pid: "",
            creatorID: userId,
            from: displayName,
            message: textValue,
            photoURL: "",
            read: false,
            date: new Date().getTime(),
            receiverIDs: receiverIDs
        };

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

    const handleCheckboxes = (event: any, index: number) => {
        event.persist();
        let newArray = [...receivers];
        newArray[index].checked = event.target.checked;
        setReceivers(newArray);
    }

    const onSelect = (file: File | null) => {
        if (file) {
            Resizer.imageFileResizer(
                file,
                600,
                600,
                'JPEG',
                100,
                0,
                (blob: Blob) => {
                    console.log(blob);
                    setSelectedFile(blob);
                },
                'blob'
            );
        }
    }

    useEffect(() => {
        getUserProfile()
        .then((userProfile:any) => {
            console.log(userProfile);
            setDisplayName(userProfile.displayName);
            setUserId(userProfile?.uid);
        });
        //Get connected accounts to populate receiver list
        getLinkedAccounts()
        .then((linkedAccounts) => {
            console.log(linkedAccounts);
            let rcvrs = [];
            for (let i = 0; i < linkedAccounts.length; i++) {
                if (linkedAccounts[i].verified === true) {
                    let displayName = linkedAccounts[i].displayName ? linkedAccounts[i].displayName : "Unknown Username";
                    let receiver = {
                        id: linkedAccounts[i].id,
                        name: displayName,
                        checked: true};
                    rcvrs.push(receiver);
                }
            }
            setReceivers(rcvrs);
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