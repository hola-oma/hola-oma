import React, { useState, useEffect } from 'react';
import { AccountLink } from 'shared/models/accountLink.model';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { roles } from 'enums/enums';

import PersonIcon from '@material-ui/icons/Person';
import ManageAccountLinkAlert from '../ManageAccountLinkAlert';
import { acceptLink, removeLink, getLinkedAccounts } from 'services/accountLink';

import './LinkedAccountManagement.css';
import Child from 'shared/components/Child/Child';

interface ILinkedAccountManagement {
  role: string;
}

const LinkedAccountManagement: React.FC<ILinkedAccountManagement> = ({ role }) => { 

  const [selectedFriend, setSelectedFriend] = useState<AccountLink>();
  const [manageAccountLinkAlertOpen, setManageAccountLinkAlertOpen] = useState<boolean>(false);

  const [linkedAccounts, setLinkedAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 
  const [pendingAccounts, setPendingAccounts] = useState<AccountLink[]>([]); // an array of AccountLink type objects 


  // On page load, this calls getLinkedAccounts from the link service
  useEffect(() => {
    let isMounted = true;

    getLinkedAccounts()
      .then((links:AccountLink[]) => {
        if (isMounted) {

          let verifiedAccounts: AccountLink[] = links.filter(link => link.verified === true);
          setLinkedAccounts(verifiedAccounts);

          let pendingAccounts: AccountLink[] = links.filter(link => link.verified === false);     
          setPendingAccounts(pendingAccounts);
        }

        // todo: send "isLoading = false" when these are done
        // could work with a global isLoading hook? 
    });

    return () => { isMounted = false; }
  }, []);

  const handleManageAccountLinkAlertClose = () => {
    setManageAccountLinkAlertOpen(false);
  }

  const manageAccountLink = (friend: AccountLink) => {
    setSelectedFriend(friend);
    setManageAccountLinkAlertOpen(true);
  }

  const acceptAccountLink = (friend: AccountLink) => {
    const accepted = acceptLink(friend?.id);
    if (accepted) {      
      // remove from pending (works for any list, really)
      removeFriendFromDOM(friend);
      // add to friends (works for any list type)
      addFriendToVerifiedList(friend);
    } else {
      console.log("Problem accepting invitation");
    }
  }

  const deleteAccountLink = (friend: AccountLink) => {
    const deleted = removeLink(friend?.id);
    if (deleted) {
      setManageAccountLinkAlertOpen(false);
      removeFriendFromDOM(friend);
    } else {
      console.log("Problem deleting friend");
    }
  }

  const addFriendToVerifiedList = (friend: AccountLink) => {
    const temp = linkedAccounts;
    friend.verified = true;
    temp.push(friend);
    setLinkedAccounts(temp);
  }

  const removeFriendFromDOM = (friend: AccountLink) => {
    if (friend.verified) {
      // removing a verified friend
      const temp = linkedAccounts.filter(account => account.id !== friend.id); // keep the links that don't have the removed-friend's ID 
      setLinkedAccounts(temp);
    } else if (!friend.verified) {
      // removing a pending invite
      const temp = pendingAccounts.filter(account => account.id !== friend.id); // keep the remaining links
      setPendingAccounts(temp);
    }
  }

  const manageButton = (friend: AccountLink) => {
    return (
      <Button variant="outlined" className="buttonDanger" onClick={() => manageAccountLink(friend)}>Remove</Button>
    )
  }

  const acceptButton = (friend: AccountLink) => {
    return (
      <Button className="buttonSafe" onClick={() => acceptAccountLink(friend)}>Accept</Button>
    )
  }

  const declineButton = (friend: AccountLink) => {
    return (
      <Button variant="outlined" className="buttonDanger" onClick={() => deleteAccountLink(friend)}>Decline</Button>
    )
  }

  const cancelButton = (friend: AccountLink) => {
    return (
      <Button variant="outlined" className="buttonDanger" onClick={() => deleteAccountLink(friend)}>Cancel</Button>
    )
  }

  const showPrimaryText = (friend: AccountLink) => {
    let name = '';
    if (friend.verified) {
      name = friend.displayName;
    } else {
      name = role === roles.poster ? friend.email : friend.displayName;
    }

    return name;
  }

  const showSecondaryText = (friend: AccountLink) => {
    let secondaryText = '';
    if (role === roles.poster) {
      secondaryText = friend.verified ? friend.email : 'Waiting for them to accept';
    } else if (role === roles.receiver) {
      secondaryText = friend.verified ? '' : 'Pending';
    }
    return secondaryText;
  }
  
  
  const generateLinkedAccountsList = (role: string, items: AccountLink[]) => {
    return items.map((friend, index) => {
      return (
        /* className={`friend ${!friend.verified ? 'unfriend' : ''}`}> */
          <ListItem key={index}>
            {/* Icon to the left */}
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>

            {/* Text */}
            <Child xs={7} className="breakLongName">
              <ListItemText
                primary={showPrimaryText(friend)}
                secondary={showSecondaryText(friend)}
              />
            </Child>
            {/* Button to the right */}
            <Child xs={4}>
              <ListItemSecondaryAction className="noRight">
                {friend.verified ? <>{manageButton(friend)}</> : role === roles.poster ? <>{cancelButton(friend)}</> : <>{declineButton(friend)} {acceptButton(friend)}</>}
              </ListItemSecondaryAction>
            </Child>
          </ListItem>
      );
    })
  };

  return (
    <>
    <Box className="devBox">
      <span className="boldText">{role === roles.poster ? 'Sharing posts with' : 'Getting updates from'}</span>
      <div>
        <List>
          {linkedAccounts.length ? generateLinkedAccountsList(role, linkedAccounts) : 'You are not following anyone. Ask a family member to send you an invitation so you can view their photos.'}
        </List>
      </div>
    </Box>
    <br/>

    <Box className="devBox">
      <span className="boldText">{role === roles.poster ? 'Sent invitations' : 'Pending invitations'}</span>
      <div>
        <List>
          {pendingAccounts.length ? generateLinkedAccountsList(role, pendingAccounts) : 'No pending invitations'}
        </List>
      </div>
    </Box>
    
    {/* Ensure 'selectedFriend' is set before attempting to render this component */}
    {selectedFriend && 
      <ManageAccountLinkAlert 
        isOpen={manageAccountLinkAlertOpen} 
        friend={selectedFriend} 
        unfriendFriend={() => deleteAccountLink(selectedFriend)}
        onClose={handleManageAccountLinkAlertClose} 
        role={role}
      />
    }
    </>
  )
}

export default LinkedAccountManagement;