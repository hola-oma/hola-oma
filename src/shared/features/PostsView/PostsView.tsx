import React, {useEffect, useState} from 'react';

import {roles} from '../../../enums/enums';

import {getUserSettings} from "services/user";
import Inbox from '../GrandparentViews/Inbox/Inbox';
import PostManagement from '../PostManagement/PostManagement';
import { Link as ButtonLink, Button, Grid, Container, Typography} from '@material-ui/core';
import {getPosts} from 'services/post';

import {Post} from '../../models/post.model';

import {acceptLink, getLinkedAccounts} from 'services/accountLink';
import {Link} from 'react-router-dom';
import {AccountLink} from 'shared/models/accountLink.model';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import PendingInvitationModal from './components/PendingInvitationModal';

import Alert from '@material-ui/lab/Alert';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CredentialsWrapper from 'shared/components/CredentialsWrapper';

interface IPostsView extends RouteComponentProps<any> {
  setIsLoading: (loading: boolean) => void;
}

const PostsView: React.FC<IPostsView> = ({ setIsLoading, history }) => {

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
    let isMounted = true;
    setIsLoading(true);

    getLinkedAccounts()
      .then((links:AccountLink[]) => {
        if (isMounted) {
          const pendingInvitations = links.filter(link => !link.verified);
          updatePendingInvitations(pendingInvitations);
          setLinkedAccounts(links);
          getPosts()
            .then((docs:Post[]) => {
              setPosts(docs);
            }).then(() => {
              getUserSettings()
                .then((userSettings:any) => {
                  setDisplayName(userSettings?.displayName ? userSettings.displayName : '');
                  setRole(userSettings?.role ? userSettings.role : roles.receiver);
                  setIsLoading(false);
                });
            })
          }
      });

      return () => { isMounted = false; }
  }, [setIsLoading]);

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

  const handleInviteButton = () => {
    if (history) history.push('/addAccountLink');
  }

  const goToNewPost = () => {
    if (history) history.push('/newPost')
  }

  return (
    <CredentialsWrapper>
    <Container>
      <Grid container justify="center">

        <Grid item xs>{/* Intentionally empty */}</Grid>

        <Grid item xs={6}>
          <Typography component="h1" variant="h4">
            Welcome, {displayName}!
          </Typography>
          <p>You have 0 new {role === roles.poster ? 'replies' : 'letters'}.</p>
        </Grid>

        {role === roles.poster &&
          <Grid item xs justify="flex-end" alignItems="center" style={{display: 'flex'}}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleInviteButton}
              startIcon={<PersonAddIcon />}
            >
              Invite follower
            </Button>
          </Grid>
        }

        {role === roles.receiver && 
          <Grid item xs>{/* Intentionally left empty so the user's name centers*/}</Grid>
        }

        {role === roles.poster &&
          <>
            <Grid item xs={12} alignItems="baseline">
              <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="bigButton"
                  onClick={goToNewPost}
                  startIcon={<AddCommentIcon />}
                >
                  Create New Post
              </Button>
            </Grid>
          </>
        }
      </Grid>
      <hr />

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

    {role === roles.poster && <PostManagement posts={posts}/>}
    {role === roles.receiver && <Inbox posts={posts}/>}
    </Container>
    </CredentialsWrapper>
  )
}

export default PostsView;