import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import Inbox from './Inbox/Inbox';
import { Box } from '@material-ui/core';
import { getPosts } from 'services/post';

import { Post } from '../../shared/models/post.model';

const PostsView: React.FC = () => {

    const [displayName, setDisplayName] = useState("");
    const [role, setRole] = useState("");
    const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    useEffect(() => {
        // todo: get user posts
        getUserProfile()
            .then((userProfile:any) => {
                setDisplayName(userProfile.displayName);
            });

        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []

    // On page load, this calls getPosts() from the post service
    useEffect(() => {
        getPosts().then((docs:Post[]) => {
            setPosts(docs);
        })
    }, []);

    let mockPosts = [
        {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false},
        {id: "xyz457", creatorID: "123abc", from: "Elizabeth H.", message: "Thinking of you", photoURL: "", read: false},
        {id: "xyz458", creatorID: "123abc", from: "Jacqueline Quentin", message: "Funny thing Jackie did at dinnertime", photoURL: "", read: false},
        {id: "xyz459", creatorID: "123abc", from: "Ashley, Mary, and Johnny's Mom", message: "Pic from the zoo", photoURL: "", read: false},
        {id: "xyz460", creatorID: "123abc", from: "The Smiths", message: "One more pic from the water park", photoURL: "", read: false},
    ];

    return (
        <>
            <h1>Welcome, {displayName}!</h1>
            <h2>Account type: {role}</h2>
            {role === roles.poster && <div>Offer the option to make a post</div>}
            <Box className="todo">
                <h3>To do (moved Grandparent items to Inbox.tsx):</h3>
                <ul>
                    <li>Family posts view</li>
                    <li>If no account is linked, remind the user to link with another user</li>
                </ul>
            </Box>

            {role === roles.receiver && <Inbox posts={mockPosts}/>}


        </>
    )
};

export default PostsView;