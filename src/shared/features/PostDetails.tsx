import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import {Box, Card, CardContent, CardHeader, Button} from '@material-ui/core';

import { Post } from '../../shared/models/post.model';
import { Link } from "react-router-dom";

const PostDetails: React.FC = () => {

    const [role, setRole] = useState("");
    const [post] = useState<Post>();
    const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    // TODO: Get clicked-on post
    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};

    return (
        <>
        <h1>Letter from {mockPost["from"]}</h1>
        {role === roles.poster && <div>Offer the option to make a post</div>}
        {role === roles.receiver && <PostDetails/>}

        <Card variant="outlined">
            <CardContent>
                {mockPost.message}
            </CardContent>
        </Card>

        <div className={"replyButton"}>
            <Link to={"/reply"}>
                <Button variant="outlined">Reply</Button>
            </Link>
        </div>

        <div className={"returnButton"}>
            <Link to={"/posts"}>
                <Button variant="outlined">Close</Button>
            </Link>
        </div>


        <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>Pass in clicked post</li>
                <li>Make pretty</li>
            </ul>
        </Box>


        </>
    )
};

export default PostDetails;