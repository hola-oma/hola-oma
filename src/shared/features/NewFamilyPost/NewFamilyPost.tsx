import React, { useState, useEffect, createRef, useMemo } from 'react';

import { useHistory } from "react-router";

import { TextField, Button, Checkbox, Typography, Tooltip } from '@material-ui/core';
import { createPost, updatePostID, uploadFile, updatePost } from "services/post";
import { Post } from "../../models/post.model";
import { getUserProfile } from "services/user";
import { getLinkedAccounts } from "services/accountLink";
import FormError from 'shared/components/FormError/FormError';
import ClearIcon from '@material-ui/icons/Clear';
import Column from 'shared/components/Column/Column';
import Row from 'shared/components/Row/Row';

import './NewFamilyPost.css';
// @ts-ignore
import Resizer from 'react-image-file-resizer';
import VideoPreview from './components/VideoPreview/VideoPreview';

interface IReceiver {
    id: string
    name: string
    checked: boolean
}

interface IReadObj {
    [key: string]: boolean
}

interface IPost {
    currentPost: Post | null,
    closeModal: any
}

const NewFamilyPost: React.FC<IPost> = ({currentPost, closeModal}) => {
    const MAX_POST_LENGTH = 400;
    const [selectedFile, setSelectedFile] = useState<Blob | File | null>();
    const [fileType, setFileType] = useState("");
    const [textValue, updateTextValue] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userId, setUserId] = useState("");
    const [receivers, setReceivers] = useState<IReceiver[]>([]);
    const [error, setError] = useState<string | null>();
    const [fileTypeError, setFileTypeError] = useState<string | null>();
    const [postTooLong, setPostTooLong] = useState(false);
    const [postLength, setPostLength] = useState(0);
    const [editing, setEditing] = useState(false);
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const history = useHistory();

    const charsOver = () => {
        return Math.abs(MAX_POST_LENGTH - postLength);
    }

    const submitPost = async (e: any) => {
        e.preventDefault();
        setError(null);
        if (postTooLong) {
            return;
        }
        if (!selectedFile && !textValue && !photoURL.length && !videoURL.length) {
            setError("You must provide a message and/or photo.");
            return;
        }
        let receiverIDs = [];
        for (let i = 0; i < receivers.length; i++) {
            if (receivers[i].checked) {
                receiverIDs.push(receivers[i].id);
            }
        }
        if (receiverIDs.length === 0) {
            setError("Please select at least one receiver");
            return;
        }

        let post = {
            pid: "",
            creatorID: userId,
            from: displayName,
            message: textValue,
            photoURL: "",
            videoURL: "",
            read: setRead(receiverIDs),
            date: new Date().getTime(),
            receiverIDs: receiverIDs
        };

        if (selectedFile) {
            const fileURL = await uploadFile(selectedFile);
            if (fileURL && fileType === 'image') {
                post.photoURL = fileURL;
            }
            else if (fileURL && fileType === 'video') {
                post.videoURL = fileURL;
            }
        }

        if (photoURL.length) {
            post.photoURL = photoURL;
        }

        if (videoURL.length) {
            post.videoURL = videoURL;
        }
    
        if (!currentPost) {
            try {
                const postSent = await createPost(post);
                if (postSent) {
                    await updatePostID(postSent);       // Add post id to new post document
                }
                if (history) history.push('/posts');
            } catch(e) {
                console.error(e.message);
            }
        } else {
            post.pid = currentPost.pid;
            try {
                updatePost(post);
                closeModal(post);
            } catch(e) {
                console.error(e.message);
            }
        }
      };

    const setRead = (receiverIDs: Array<string>) => {
        let readObj: IReadObj;
        readObj = {};
        for (let i = 0; i < receiverIDs.length; i++) {
            readObj[receiverIDs[i]] = false;
        }
        return readObj;
    }

    const handleCheckboxes = (event: any, index: number) => {
        event.persist();
        let newArray = [...receivers];
        newArray[index].checked = event.target.checked;
        setReceivers(newArray);
    }

    const clickFileUpload = () => {
        let element = document.getElementById("file-upload");
        if (element != null) {
            element.click();
        }
    }

    const onSelect = (file: File | null) => {
        setFileTypeError(null);
        if (file && file.type.indexOf('image') !== -1) {
            setFileType('image');
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
        } else if (file && file.type.indexOf('video') !== -1) {
            if (file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/webm') {
                setSelectedFile(file);
                setFileType('video');
            }
            else {
                setFileTypeError("This file type is not supported.");
            }
        }
    }

    const getImageAsUrl = () => {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl: string = selectedFile ? urlCreator.createObjectURL(selectedFile): '';
        return imageUrl;
    }

    const setMediaNull = () => {
        setVideoURL("");
        setPhotoURL("");
    }

    const sortNames = (a: any, b: any) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        getUserProfile()
        .then((userProfile:any) => {
            setDisplayName(userProfile.displayName);
            setUserId(userProfile?.uid);
        });
        //Get connected accounts to populate receiver list
        getLinkedAccounts()
        .then((linkedAccounts) => {
            let rcvrs = [];
            for (let i = 0; i < linkedAccounts.length; i++) {
                if (linkedAccounts[i].verified === true) {
                    let displayName = linkedAccounts[i].displayName ? linkedAccounts[i].displayName : "Unknown Username";
                    let checked = true;
                    if (currentPost && currentPost.receiverIDs.indexOf(linkedAccounts[i].id) === -1) {
                        checked = false;
                    }
                    let receiver = {
                        id: linkedAccounts[i].id,
                        name: displayName,
                        checked: checked};
                    rcvrs.push(receiver);
                }
            }
            setReceivers(rcvrs.sort(sortNames));
        });
        if (currentPost) {
            setEditing(true);
            updateTextValue(currentPost.message);
            if (currentPost.photoURL) {
                setPhotoURL(currentPost.photoURL);
                setFileType('image');
            } else if (currentPost.videoURL) {
                setVideoURL(currentPost.videoURL);
                setFileType('video');
            }
        }
    }, [currentPost]); // fires on page load if this is empty [] 

    useEffect(() => {
        setPostLength(textValue.length);
        if (textValue.length > MAX_POST_LENGTH) {
            setPostTooLong(true);
        } else {
            setPostTooLong(false);
        }
    }, [textValue]); // fires when text changes

    // use memo tells it to recompute only when selectedFile 
    const renderVideo = useMemo(() => (
        <VideoPreview videoSrc={getImageAsUrl()}/>
    ), [selectedFile])

    return (
        <>
        <Column justify="center" alignItems="center">
            {!editing && <Typography component="h2" variant="h5" align="center">
                Create Post
            </Typography>}
            {editing && <Typography component="h2" variant="h5" align="center">
                Edit Post
            </Typography>}
            <br/>
            <form className="newFamilyPostForm" noValidate onSubmit={e => submitPost(e)}>
            {(!selectedFile && !photoURL && !videoURL) &&
                <Row justify="center">
                    <Tooltip title="Supported video formats: mp4, webm, ogv">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={clickFileUpload}>
                            Select a photo or video
                        </Button>
                    </Tooltip>
                    <input
                        type="file"
                        id="file-upload"
                        style={{display:'none'}}
                        onChange={(event) => onSelect(event.target.files ? event.target.files[0] : null)} />
                    {fileTypeError &&
                        <FormError error={fileTypeError}/>
                    }
                </Row>
            }
            {selectedFile &&
                <>
                    {fileType === 'image' &&
                        <Row justify="center">
                            <img src={getImageAsUrl()}
                                className="photo"
                                alt="Attached img"/>
                        </Row>
                    }
                    {fileType === 'video' &&
                        renderVideo
                    }
                    <Row justify="center">
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => setSelectedFile(null)}>
                            <ClearIcon/>Remove file
                        </Button>
                    </Row>
                </>
            }
            {(photoURL || videoURL) &&
                <>
                    {fileType === 'image' &&
                        <Row justify="center">
                            <img src={photoURL}
                                className="photo"
                                alt="Attached img"/>
                        </Row>
                    }
                    {fileType === 'video' &&
                        <Row justify="center">
                            <video src={videoURL}
                                className="photo"
                                preload="auto"
                                controls
                                style={{height: '95%', width: '95%'}}
                            />
                        </Row>
                    }
                    <Row justify="center">
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => setMediaNull()}>
                            <ClearIcon/>Remove file
                        </Button>
                    </Row>
                </>
            }
            <TextField
                multiline
                fullWidth
                margin="normal"
                rows="10"
                variant="outlined"
                label="Type a Message"
                value={textValue}
                onChange={e => updateTextValue(e.target.value)}/>
            <Typography variant="subtitle2">{postLength}/{MAX_POST_LENGTH}</Typography>
            {postTooLong && 
                <Row xs={12} justify="center">
                    <FormError error={`Maximum ${MAX_POST_LENGTH} characters (${charsOver()} over)`}/>
                </Row>
            }
            <Row justify="center">
                <b>Recipients</b>
            </Row>
            {
                receivers.map((receiver: IReceiver, index: number) => {
                    return (
                        <Row justify="flex-start" key={receiver.id}>
                            <label>
                                <Checkbox name={receiver.id} checked={receiver.checked} onChange={e => handleCheckboxes(e, index)} />
                                {receiver.name}
                            </label>
                        </Row>
                    )
                })
            }
            <br/>
            <Row justify="center">
            {editing &&
                <Button
                type="submit"
                variant="contained"
                disabled={postTooLong}>
                Update Post
            </Button>}
            {!editing &&
                <Button
                    type="submit"
                    variant="contained"
                    disabled={postTooLong}>
                    Send Post
                </Button>
            }
            </Row>
            {error &&
                <FormError error={error}/>
            }
            </form>
        </Column>
     </>
    )
};

export default NewFamilyPost;