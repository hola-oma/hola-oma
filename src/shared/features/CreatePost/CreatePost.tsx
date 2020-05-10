import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import { roles } from '../../../enums/enums';
import { getUserSettings } from "services/user";

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
            <>
                {role === roles.poster && <NewFamilyPost/>}
                {role === roles.receiver && history.push({pathname: '/startReply', state: currentPost }) }
            </>
        </>
    )
};

export default CreatePost;