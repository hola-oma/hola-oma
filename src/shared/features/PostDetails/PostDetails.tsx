import React, { useState, useEffect } from 'react';

import { roles } from '../../../enums/enums';
import { getUserSettings} from "services/user";

import { Post } from '../../models/post.model';

interface IPostDetails {
    currentPost: Post;
}

const PostDetails: React.FC<IPostDetails> = ({ currentPost }) => {

    const [role, setRole] = useState("");
    const [post] = useState<Post>();

    useEffect(() => {
        getUserSettings()
            .then((doc:any) => {
                setRole(doc?.role);
            });
    }, []); // fires on page load if this is empty []

    return (
        <>
        {role === roles.poster && <div>Offer the option to make a post</div>}
        {role === roles.receiver && <div>View Grandparent Post</div>}
        </>
    )
};

export default PostDetails;