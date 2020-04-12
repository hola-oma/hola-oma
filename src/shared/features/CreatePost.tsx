import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';
import { getUserSettings } from "services/user";

// import { Post } from '../../shared/models/post.model';
import GrandparentReplyOptions from "./GrandparentReplyOpts";

const CreatePost: React.FC = () => {

    const [role, setRole] = useState("");
    // const [post] = useState<Post>();
    // const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []

    // TODO: Get clicked-on post
    // let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};

    return (
        <>
            <h2>Create Post</h2>
            <>
                {role === roles.poster && <div>Create a new post</div>}
                {role === roles.receiver && <GrandparentReplyOptions/>}
            </>
        </>
    )
};

export default CreatePost;