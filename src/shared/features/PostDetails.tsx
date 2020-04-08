import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import Inbox from './Inbox/Inbox';
import { Box } from '@material-ui/core';
import { getPosts } from 'services/post';

import { Post } from '../../shared/models/post.model';

const PostDetails: React.FC = () => {

    const [role, setRole] = useState("");
    const post = useState<Post>();
    const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    // Get one post

    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};

    return (
        <>
        <h1>Letter from {mockPost["from"]}</h1>
        {role === roles.poster && <div>Offer the option to make a post</div>}
        {role === roles.receiver && <PostDetails/>}


        <Box className="todo">
            <h3>To do items:</h3>
                <ul>
                    <li>Show post</li>
                    <li>Show edit options</li>
                    <li>Make edit options clickable</li>
                </ul>
        </Box>


        </>
    )
};

export default PostDetails;