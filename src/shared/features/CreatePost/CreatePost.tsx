import React, {useState, useEffect, useContext} from 'react';

import { roles } from '../../../enums/enums';
import { getUserSettings } from "services/user";

// import { Post } from '../../shared/models/currentPost.model';
import GrandparentReplyOptions from "../GrandparentViews/GrandparentReply/GrandparentReplyOpts";

import NewFamilyPost from ".././NewFamilyPost/NewFamilyPost";
import {GrandparentPostContext} from "../../../App";

const CreatePost: React.FC = () => {

    const [role, setRole] = useState("");
    const CurrentPost = useContext(GrandparentPostContext);

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []

    return (
        <>
            <>
                {role === roles.poster && <NewFamilyPost/>}
                {role === roles.receiver && <GrandparentReplyOptions post={CurrentPost.post}/>}
            </>
        </>
    )
};

export default CreatePost;