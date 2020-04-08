import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import {Box, Card, CardContent, CardHeader, Button} from '@material-ui/core';

import { Post } from '../../shared/models/post.model';
import { Link } from "react-router-dom";

const ReplyOptions: React.FC = () => {
//
    const [role, setRole] = useState("");
//     const [post] = useState<Post>();
//     const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects
//
    // TODO: Get clicked-on post
    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};
//
    return (
        <>

        <h1>Letter from {mockPost["from"]}</h1>

        <Card variant="outlined">
            <CardContent>
                {mockPost.message}
            </CardContent>
        </Card>

         <div className={"voiceButton"}>
             <Link to={"/"}>
                 <Button variant="outlined">Voice Message</Button>
             </Link>
         </div>

         <div className={"picButton"}>
             <Link to={"/"}>
                 <Button variant="outlined">Your Picture</Button>
             </Link>
         </div>

         <div className={"emojiButton"}>
             <Link to={"/"}>
                 <Button variant="outlined">Smiley</Button>
             </Link>
         </div>


             <Box className="todo">
         <h3>To do items:</h3>
         <ul>
             <li>Create routes for each reply option</li>
             <li>Make pretty</li>
         </ul>
     </Box>


     </>
    )
};

export default ReplyOptions;