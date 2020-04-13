import React from 'react';
// import { roles } from '../../enums/enums';

// import { getUserSettings, getUserProfile } from "services/user";
import {Box, Card, CardContent, Button} from '@material-ui/core';

// import { Post } from '../../shared/models/currentPost.model';
import { Link } from "react-router-dom";

const GrandparentMsgView: React.FC = () => {
    // TODO: Get clicked-on currentPost
    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};

    return (
        <>

        <h1>Letter from {mockPost["from"]}</h1>

        <Card variant="outlined">
            <CardContent>
                {mockPost.message}
            </CardContent>
        </Card>

        <div className={"replyButton"}>
            <Link to={"/newPost"}>
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
                <li>Create routes for each reply option</li>
                <li>Make pretty</li>
            </ul>
        </Box>

     </>
    )
};

export default GrandparentMsgView;