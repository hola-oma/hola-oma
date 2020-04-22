import React  from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {Box, Card, CardContent, Button} from '@material-ui/core';
import {Post} from "../../../../models/post.model";
import GrandparentLayout from "../../GrandparentLayout";

interface IGrandparentReplyOpts {
  post: Post;
}

const logClick = () => {
  console.log("Button clicked");
}

const GrandparentReplyOpts: React.FC<IGrandparentReplyOpts> = ({post}) => {

    return (
        <>

        <GrandparentLayout
          post={post}
          headerText={"Reply to "}
          buttonText={["Smiley", "Other Options to Be Added"]}
          buttonActions={[logClick, logClick]}
          buttonIcons={[<InsertEmoticonIcon />, <MoreHorizIcon />]}
        />


        {/*<Card variant="outlined">*/}
        {/*    <CardContent>*/}
        {/*        " "*/}
        {/*    </CardContent>*/}
        {/*</Card>*/}

        {/* /!*<div className={"voiceButton"} onClick={setReplyOpt}>*!/  //TODO*/}
        {/* <div className={"voiceButton"} >*/}
        {/*     <Button variant="outlined">Voice Message</Button>*/}
        {/* </div>*/}

        {/* <div className={"picButton"}>*/}
        {/*     <Button variant="outlined">Your Picture</Button>*/}
        {/* </div>*/}

        {/* <div className={"emojiButton"}>*/}
        {/*     <Button variant="outlined">Smiley</Button>*/}
        {/* </div>*/}

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