import React, {useEffect, useState} from 'react';

import {roles} from '../../../enums/enums';

import {getUserSettings} from "services/user";
import Inbox from '../GrandparentViews/Inbox/Inbox';
import PostManagement from '../PostManagement/PostManagement';
import {Link as ButtonLink, Button, Tooltip, Typography} from '@material-ui/core';
import {getPosts} from 'services/post';

import {Post} from '../../models/post.model';
import { getRepliesToPost } from "services/reply";

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

import './PostsView.css';

interface IPostsView extends RouteComponentProps<any> {
  setIsLoading: (loading: boolean) => void;
}

const PostsView: React.FC<IPostsView> = ({ setIsLoading, history }) => {

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [userID, setUserID] = useState("");
  const [posts, setPosts] = useState<Post[]>([]); // an array of Post type objects
  const [linkedAccounts, setLinkedAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 
  const [pendingInvitations, setPendingInvitations] = useState<AccountLink[]>([]);
  const [invite, setInvite] = useState<AccountLink>();
  const [invitationModalOpen, setInvitationModalOpen] = useState<boolean>(false);
  const [unreadRepliesTotal, setUnreadRepliesTotal] = useState(0);
  const [verifiedReceivers, setVerifiedReceivers] = useState<boolean>(false);

  const updatePendingInvitations = (dataArr: AccountLink[]) => {
    if (dataArr.length > 0) {
      setPendingInvitations(dataArr);
      setInvite(dataArr[dataArr.length-1]);
    }
  }

  const processLinkedAccounts = async () => {
    // db call, check for invitations and linked accounts 
    const links:AccountLink[] = await getLinkedAccounts();
        const pendingInvitations = links.filter(link => !link.verified);
        updatePendingInvitations(pendingInvitations);
        const verified = links.filter(link => link.verified);
        if (verified.length > 0) {
          setVerifiedReceivers(true);
        }
        setLinkedAccounts(links);
  }

  const processUnreadReplies = async (userPosts: Post[]) => {
    let repliesTotal = 0;
    for await (let post of userPosts) {
        const replyArray: any = await getRepliesToPost(post.pid);
          replyArray.forEach((reply: any) => {
            if (!reply.read) {
              // found an unread reply! - mark this particular post as having new replies
              post.unreadReplyCount = (post.unreadReplyCount ?? 0) + 1;
              // increase the 'global' count of unread replies 
              repliesTotal++;
            }
          });
      };
      setUnreadRepliesTotal(repliesTotal);
  }

  const processPosts = async () => {
    // db call, get the posts for this user 
    const docs = await getPosts();
      setPosts(docs)
      await processUnreadReplies(docs);
  }

  const processUserSettings = async () => {
    // db call, get this user's profile settings
    await getUserSettings()
    .then((userSettings:any) => {
      setDisplayName(userSettings?.displayName ? userSettings.displayName : '');
      setRole(userSettings?.role ? userSettings.role : roles.receiver);
      setIsLoading(false);
    }); // closes if isMounted
  }

  const processPage = async () => {
    await processLinkedAccounts();
    await processPosts();
    await processUserSettings();
  }

  // Fires on page load. Gets pending invites, posts, and user settings. 
  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    if (isMounted) {
      processPage().then(() => {
        setIsLoading(false);
      })
    }

    return () => { isMounted = false; }

    // don't put the processPage function in here, that's unreasonable 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const countNewPosts = (posts: Array<Post>) => {
    let unreadCount = 0;
    posts.forEach(function(post) {
      if (!post.read[userID]) {unreadCount++}
    })
    return unreadCount;
  }

  const welcomeName = () => (
    <div className="welcomeName">
      <span className="boldText">
        Welcome, {displayName}!
      </span>
    </div>
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

  const disabledCreateNewPostButton = () => (
    <Tooltip title="Create posts after you have linked to another account">
      <span>
        <Button
          variant="contained"
          color="primary"
          disabled
          size="large"
          startIcon={<AddCommentIcon />}
          >
          Create New Post
        </Button>
      </span>
    </Tooltip>
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
    <div style={{overflow: role === roles.receiver ? 'hidden' : 'auto'}}>
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
                  {role === roles.poster &&
                  <Typography variant="subtitle1" gutterBottom>
                      You have {unreadRepliesTotal} new {unreadRepliesTotal !== 1 ? 'replies' : 'reply'}.
                  </Typography>
                  }
                  { (role === roles.receiver && pendingInvitations.length === 0) &&
                  <Typography variant="subtitle1">
                      You have {countNewPosts(posts)} new letter(s).
                  </Typography>
                  }

                </Child>
              </Column>
            </Child>

            {/* ROW CHILD 3 * - invite button OR empty spacer */ }
            {role === roles.poster &&
            <Child container xs justify="center" alignItems="center" style={{display: 'flex'}}>
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

            <Row>
              <Child xs={12}>
                {role === roles.poster &&
                <>
                  {!verifiedReceivers &&
                  <>
                    {linkedAccounts.length === 0 &&
                    <>
                        <Alert variant="filled" severity="warning">
                            You are not linked with any accounts yet! <Link to="/addAccountLink">Invite someone</Link>
                        </Alert>
                    </>
                    }
                      <Row justify="center">
                          <Child>
                              <Child xs={12}>
                                {disabledCreateNewPostButton()}
                              </Child>
                          </Child>
                      </Row>
                  </>
                  }
                  {verifiedReceivers &&
                  <Row justify="center">
                      <Child>
                          <Child xs={12}>
                            {createNewPostButton()}
                          </Child>
                      </Child>
                  </Row>
                  }
                </>
                }

                {role === roles.receiver && pendingInvitations.length > 0 &&
                <>
                  {pendingInviteAlert()}
                </>
                }

                {role === roles.poster && <hr/>}

                {role === roles.poster && <PostManagement displayName={displayName} posts={posts}/>}
                {role === roles.receiver && <Inbox posts={posts}/>}
              </Child>
            </Row>

          </Child>
        </Column>
      </CredentialsWrapper>
    </div>

  )
}

export default PostsView;