import React  from 'react';

// import { roles } from '../../enums/enums';
// import { getUserSettings, getUserProfile } from "services/user";
import {Box, Card, CardContent, Button} from '@material-ui/core';

// import { Post } from '../../shared/models/currentPost.model';
// import { Link } from "react-router-dom";

const GrandparentReplyOpts: React.FC = () => {

    // const [role, setRole] = useState("");
    // const [currentPost] = useState<Post>();
    // const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects

    // TODO: Get clicked-on currentPost
    let mockPost = {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false};
    // let replyOpt = "";

    return (
        <>

        <h1>Letter from {mockPost["from"]}</h1>

        <Card variant="outlined">
            <CardContent>
                {mockPost.message}
            </CardContent>
        </Card>

         {/*<div className={"voiceButton"} onClick={setReplyOpt}>*/}  //TODO
         <div className={"voiceButton"} >
             <Button variant="outlined">Voice Message</Button>
         </div>

         <div className={"picButton"}>
             <Button variant="outlined">Your Picture</Button>
         </div>

         <div className={"emojiButton"}>
             <Button variant="outlined">Smiley</Button>
         </div>

         <Box className="todo">
            <h3>To do items:</h3>
            <ul>
                <li>"setReplyOpt" function</li>
                <li>Create component for each reply option</li>
                <li>Option to return to message</li>
                <li>"Sent reply" View</li>
                <li>Make pretty</li>
            </ul>
        </Box>
     </>
    )
};

export default GrandparentReplyOpts;