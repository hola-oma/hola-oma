import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings} from "services/user";
import {Box } from '@material-ui/core';

import { Post } from '../../shared/models/post.model';
import { Link } from "react-router-dom";
import GrandparentMsgView from "./GrandparentMsgView";

const PostDetails: React.FC = () => {

    const [role, setRole] = useState("");
    const [post] = useState<Post>();
    const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []

    // TODO: Get clicked-on post
    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};

    return (
        <>
        {role === roles.poster && <div>Offer the option to make a post</div>}
        {role === roles.receiver && <GrandparentMsgView/>}
        </>
    )
};

export default PostDetails;