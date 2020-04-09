import React, { useState, useEffect } from 'react';

import { roles } from '../../../enums/enums';

import { getUserSettings, getUserProfile } from "services/user";
import Inbox from '../Inbox/Inbox';
import { Box, Link as ButtonLink} from '@material-ui/core';
import { getPosts } from 'services/post';

import { Post } from '../../models/post.model';

import { getLinkedAccounts } from 'services/accountLink';
import { Link } from 'react-router-dom';
import { AccountLink } from 'shared/models/accountLink.model';

import PendingInvitationModal from './components/PendingInvitationModal';

import Alert from '@material-ui/lab/Alert';

const PostsView: React.FC = () => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects 
  const [linkedAccounts, setLinkedAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 
  const [pendingInvitations, setPendingInvitations] = useState<boolean>(false);
  const [invite, setInvite] = useState<AccountLink>();
  const [invitationModalOpen, setInvitationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getUserProfile()
      .then((userProfile:any) => {
        console.log(userProfile);
        setDisplayName(userProfile.displayName);
      });

    getUserSettings()
      .then((doc:any) => {
        setRole(doc?.role);
      });
  }, []); // fires on page load if this is empty [] 

  // On page load, this calls getPosts() from the post service
  useEffect(() => {
    getPosts().then((docs:Post[]) => {
      setPosts(docs);
    })
  }, []);

  // On page load, this calls getLinkedAccounts from the link service
  useEffect(() => {
    getLinkedAccounts()
      .then((links:any) => {
        links.forEach((link:any) => {
          if (link.verified === false) {
            setInvite(link);
            setPendingInvitations(true);
          }
        });
      // [ {id: abc123, verified: false }, { id:xyz123, verified: false }]
      setLinkedAccounts(links);
    })
  }, []);

  const acceptInvite = () => {
    console.log("accepted invite");
    setInvitationModalOpen(false);
  }

  const declineInvite = () => {
    console.log("rejected invite");
    setInvitationModalOpen(false);
  }

  const handleInvitationModalClose = () => {
    setInvitationModalOpen(false);
  }

  let mockPosts = [
    {id: "xyz456", creatorID: "123abc", from: "Stephanie", message: "Hello, Grandpa!", photoURL: "", read: false},
    {id: "xyz457", creatorID: "123abc", from: "Elizabeth H.", message: "Thinking of you", photoURL: "", read: false},
    {id: "xyz458", creatorID: "123abc", from: "Jacqueline Quentin", message: "Funny thing Jackie did at dinnertime", photoURL: "", read: false},
    {id: "xyz459", creatorID: "123abc", from: "Ashley, Mary, and Johnny's Mom", message: "Pic from the zoo", photoURL: "", read: false},
    {id: "xyz460", creatorID: "123abc", from: "The Smiths", message: "One more pic from the water park", photoURL: "", read: false},
  ]

  return (
    <>
    <h1>Welcome, {displayName}!</h1>

    {role === roles.poster &&
      <Link to="/addAccountLink">Invite someone</Link>
    }

    {role === roles.poster &&
      <>
      {linkedAccounts.length === 0 && 
        <Alert variant="filled" severity="warning">
          You are not linked with any accounts yet! <Link to="/addAccountLink">Invite someone</Link>
        </Alert>
      }
      </>
    }

    {role === roles.receiver && pendingInvitations === true &&
      <>
        <Alert variant="filled" severity="warning">
          <span>
            You have a pending invitation from displayName.   
          <ButtonLink 
            component="button" 
            variant="body2" 
            onClick={() => {setInvitationModalOpen(true)}}
            >View invitation
          </ButtonLink>

          <PendingInvitationModal 
            isOpen={invitationModalOpen} 
            invite={invite} 
            acceptInvite={acceptInvite}
            declineInvite={declineInvite}
            onClose={handleInvitationModalClose} />
          </span>
        </Alert>
      </>
    }

    {role === roles.poster && 
      <p>Show list of posts here</p>
    }

    {role === roles.receiver && <Inbox posts={mockPosts}/>}

    <Box className="todo">
      <h3>To do items:</h3>
      <ul>
        <li>Make the envelope cards clickable, clicking one goes to a page to view it</li>
        <li>Add a service for getting post data from database</li>
        <li>If no account is linked, remind the user to link with another user</li>
        <li>Shrink font or truncate sender's name when sender's names are so long they distort the length of the card</li>
      </ul>
    </Box>
    </>
  )
}

export default PostsView;