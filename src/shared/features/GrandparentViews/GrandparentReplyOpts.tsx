import React  from 'react';

import {Box, Card, CardContent, Button, SvgIconProps} from '@material-ui/core';
import {Post} from "../../models/post.model";

interface IGrandparentReplyOpts {
  post: Post;
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = (post) => {

    return (
        <>

        <h1>Letter from " "</h1>

        <Card variant="outlined">
            <CardContent>
                " "
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