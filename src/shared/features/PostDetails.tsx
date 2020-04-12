import React, { useState, useEffect } from 'react';

import { roles } from '../../enums/enums';
import { getUserSettings} from "services/user";

// import { Post } from '../../shared/models/post.model';
import GrandparentMsgView from "./GrandparentMsgView";
import FamilyMsgView from "./FamilyMsgView/FamilyMsgView";

const PostDetails: React.FC = () => {

    const [role, setRole] = useState("");
    // const [post] = useState<Post>();

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
        {role === roles.poster && <FamilyMsgView/>}
        {role === roles.receiver && <GrandparentMsgView/>}
        </>
    )
};

export default PostDetails;