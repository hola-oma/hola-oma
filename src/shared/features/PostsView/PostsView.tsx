import React, {useEffect, useState} from 'react';

import {roles} from '../../../enums/enums';

import {getUserSettings} from "services/user";
import Inbox from '../GrandparentViews/Inbox/Inbox';
import PostManagement from '../PostManagement/PostManagement';
import { Link as ButtonLink, Button } from '@material-ui/core';
import {getPosts} from 'services/post';

import {Post} from '../../models/post.model';

import {acceptLink, getLinkedAccounts, removeLink} from 'services/accountLink';
import {Link} from 'react-router-dom';
import {AccountLink} from 'shared/models/accountLink.model';

import { RouteComponentProps } from 'react-router-dom'; // give us 'history' object

import PendingInvitationModal from './components/PendingInvitationModal';

import Alert from '@material-ui/lab/Alert';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CredentialsWrapper from 'shared/components/CredentialsWrapper';
import Column from 'shared/components/Column/Column';
import Child from 'shared/components/Child/Child';
import Row from 'shared/components/Row/Row';

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
  const [numNewReplies, setNumNewReplies] = useState(0);

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
        if (pendingInvitations.length > 0) {
          pendingInvitations.pop();
          updatePendingInvitations(pendingInvitations);
        }
      }
    } else {
      console.log("Problem accepting invitation");
    }
    // close the modal
    setInvitationModalOpen(false);
  }

  const removeInviteFromDOM = (inviteID: String) => {
    if (inviteID) {
      if (pendingInvitations.length > 0) {
        pendingInvitations.pop();
        updatePendingInvitations(pendingInvitations);
      }
    }
  }

  const declineInvite = (pendingInvite: AccountLink) => {
    const deleted = removeLink(pendingInvite?.id);
    if (deleted) {
      setInvitationModalOpen(false);
      removeInviteFromDOM(pendingInvite?.id);
      // remove it from the collection of pending invites that make the alert show
    } else {
      console.log("Problem declining invitation");
    }
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

  const updateNewReplies = (num: number) => {
    setNumNewReplies(num);
  }

  const welcomeName = () => (
    <span className="boldText">
      Welcome, {displayName}!
    </span>
  )

  const inviteButton = () => (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={handleInviteButton}
      startIcon={<PersonAddIcon />}
    >
      Invite follower
    </Button>
  )

  const createNewPostButton = () => (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className="bigButton noMargin"
      onClick={goToNewPost}
      startIcon={<AddCommentIcon />}
      >
      Create New Post
    </Button>
  )

  const pendingInviteAlert = () => (
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
  )

  return (
    <CredentialsWrapper>

      <Column justify="center" alignItems="center" id="postViewColumn">

          {/* COLUMN CHILD 1: Welcome, X read letters, invitations alert */ }
          <Row justify="center" id="postsViewRow">
            {/* ROW CHILD 1 - empty spacer to balance 'invite' button on right */}
            <Child xs>{/* Intentionally empty */}</Child>

            {/* ROW CHILD 2 - welcome message and replies message */}
            <Child xs={12} sm={8}>
              <Column justify="center" alignItems="center">
                <Child xs={12}>
                  {welcomeName()}
                </Child>

                <Child xs={12}>
                  <p>You have {numNewReplies} new {role === roles.poster ? (numNewReplies !== 1 ? 'replies' : 'reply') : 'letters'}.</p>
                </Child>
              </Column>
            </Child>

            {/* ROW CHILD 3 * - invite button OR empty spacer */ }
            {role === roles.poster &&
              <Child xs justify="center" alignItems="center" style={{display: 'flex'}}>
                {inviteButton()}
              </Child>
            }

            {role === roles.receiver && 
              <Child xs>
                {/* Intentionally empty so the user's name centers without INVITE FOLLOWER button present*/}
              </Child>
            }
          </Row>

          {/* COLUMN CHILD 2 - CREATE NEW POST and VIEW OLD POSTS */ }
          <Child xs>
          
            {role === roles.poster &&
              <Row justify="center">
                <Child>
                  <Child xs={12}>
                    {createNewPostButton()}
                  </Child>
                </Child>
              </Row>
            }

            <Row>
              <Child xs={12}>
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
                    {pendingInviteAlert()}
                  </>
                }

                <hr/>

                {role === roles.poster && <PostManagement displayName={displayName} posts={posts} onNewReplies={updateNewReplies}/>}
                {role === roles.receiver && <Inbox posts={posts}/>}
            </Child>

          </Row>

        </Child>
      </Column>
    </CredentialsWrapper>
  )
}

export default PostsView;