import React, {useEffect, useState} from 'react';

import {roles} from '../../../enums/enums';

import {getUserDataByID, getUserProfile, getUserSettings} from "services/user";
import Inbox from '../Inbox/Inbox';
import PostManagement from '../PostManagement/PostManagement';
import { Link as ButtonLink} from '@material-ui/core';
import { getPosts } from 'services/post';

import {Post} from '../../models/post.model';

import {acceptLink, getLinkedAccounts} from 'services/accountLink';
import {Link} from 'react-router-dom';
import {AccountLink} from 'shared/models/accountLink.model';

import PendingInvitationModal from './components/PendingInvitationModal';

import Alert from '@material-ui/lab/Alert';
import * as firebase from "firebase";


interface IPostsView {
  setIsLoading: (loading: boolean) => void;
}

const PostsView: React.FC<IPostsView> = ({ setIsLoading }) => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects 
  const [linkedAccounts, setLinkedAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 
  const [pendingInvitations, setPendingInvitations] = useState<AccountLink[]>([]);
  const [invite, setInvite] = useState<AccountLink>();
  const [invitationModalOpen, setInvitationModalOpen] = useState<boolean>(false);

  const updatePendingInvitations = (dataArr: AccountLink[]) => {
    if (dataArr.length > 0) {
      setPendingInvitations(dataArr);
      setInvite(dataArr[dataArr.length-1]);
    }
  }

  // Get display name
  useEffect(() => {
    setIsLoading(true);

    getLinkedAccounts()
      .then((links:AccountLink[]) => {
        const pendingInvitations = links.filter(link => !link.verified);
        updatePendingInvitations(pendingInvitations);
        setLinkedAccounts(links);
        getPosts()
          .then((docs:Post[]) => {
            setPosts(docs);
          }).then(() => {
            getUserSettings()
              .then((userSettings:any) => {
                setDisplayName(userSettings.displayName);
                setRole(userSettings.role);
                setIsLoading(false);
              });
          })
      });
  }, []);

  const acceptInvite = () => {
    if (invite) {
      const accepted = acceptLink(invite?.id);
      if (accepted) {
        let temp = pendingInvitations;
        temp.pop();
        updatePendingInvitations(pendingInvitations);
      }
    } else {
      console.log("Problem accepting invitation");
    }
    // close the modal
    setInvitationModalOpen(false);
  }

  const declineInvite = () => {
    console.log("rejected invite");
    setInvitationModalOpen(false);
  }

  const handleInvitationModalClose = () => {
    setInvitationModalOpen(false);
  }

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

    {role === roles.receiver && pendingInvitations.length > 0 &&
      <>
        <Alert variant="filled" severity="warning">
          <span>
            You have a pending invitation from {invite?.displayName}.&nbsp;   
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
      <PostManagement posts={posts}/>
    }
    {role === roles.receiver && <Inbox posts={posts}/>}

    </>
  )
}

export default PostsView;