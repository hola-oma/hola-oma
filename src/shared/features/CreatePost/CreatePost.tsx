import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import { roles } from '../../../enums/enums';
import { getUserSettings } from "services/user";

import GrandparentReplyOptions from "../GrandparentViews/GrandparentReply/GrandparentReplyOpts";

import NewFamilyPost from ".././NewFamilyPost/NewFamilyPost";

const CreatePost: React.FC = () => {

    const [role, setRole] = useState("");

    const history = useHistory();
    const location = useLocation();
    const currentPost: any = location.state;  // post was passed in as state

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []);

    return (
        <>
          {role === roles.poster && <h2>Create Post</h2>}

            <>
                {role === roles.poster && <NewFamilyPost/>}
                {role === roles.receiver && <GrandparentReplyOptions/>}
            </>
        </>
    )
};

export default CreatePost;