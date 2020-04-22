import React, { useState, useEffect } from 'react';

import { roles } from '../../../enums/enums';
import { getUserSettings } from "services/user";

import NewFamilyPost from ".././NewFamilyPost/NewFamilyPost";

const CreatePost: React.FC = () => {

    const [role, setRole] = useState("");

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []



    return (
        <>
            <h2>Create Post</h2>
            <>
                {role === roles.poster && <NewFamilyPost/>}
                {/*{role === roles.receiver && <NewGrandparentReply/>}*/}
            </>
        </>
    )
};

export default CreatePost;