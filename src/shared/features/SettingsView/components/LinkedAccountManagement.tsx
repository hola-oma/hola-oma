import React, { useState, useEffect } from 'react';
import { AccountLink } from 'shared/models/accountLink.model';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { roles } from 'enums/enums';

import PersonIcon from '@material-ui/icons/Person';
import ManageAccountLinkAlert from './ManageAccountLinkAlert';
import { acceptLink, removeLink, getLinkedAccounts } from 'services/accountLink';

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
    getLinkedAccounts()
      .then((links:AccountLink[]) => {
        let verifiedAccounts: AccountLink[] = links.filter(link => link.verified === true);
        setLinkedAccounts(verifiedAccounts);

        let pendingAccounts: AccountLink[] = links.filter(link => link.verified === false);
        setPendingAccounts(pendingAccounts);
    })
  }, []);

  const handleManageAccountLinkAlertClose = () => {
    setManageAccountLinkAlertOpen(false);
  }

  const manageAccountLink = (friend: AccountLink) => {
    console.log("Opening alert to manage this friend: ", friend.id);
    setSelectedFriend(friend);
    setManageAccountLinkAlertOpen(true);
  }

  const acceptAccountLink = (invite: AccountLink) => {
    console.log("accepting friend request from: ", invite.id);

    const accepted = acceptLink(invite?.id);
    if (accepted) {
      console.log("Todo: refresh account lists and pop a confirmation toast");
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

  const removeFriendFromDOM = (friend: AccountLink) => {
    if (friend.verified) {
      // removing a verified friend
      const temp = linkedAccounts.filter(account => account.id != friend.id); // keep the links that don't have the removed-friend's ID 
      setLinkedAccounts(temp);
    } else if (!friend.verified) {
      // removing a pending invite
      const temp = pendingAccounts.filter(account => account.id != friend.id); // keep the remaining links
      setPendingAccounts(temp);
    }
  }

  const manageButton = (friend: AccountLink) => {
    return (
      <Button color="primary" onClick={() => manageAccountLink(friend)}>Remove</Button>
    )
  }

  const acceptButton = (friend: AccountLink) => {
    return (
      <Button color="primary" onClick={() => acceptAccountLink(friend)}>Accept</Button>
    )
  }

  const declineButton = (friend: AccountLink) => {
    return (
      <Button color="primary" onClick={() => deleteAccountLink(friend)}>Decline</Button>
    )
  }
  
  const generateLinkedAccountsList = (items: AccountLink[]) => {
    return items.map((friend, index) => {
      return (
          <ListItem key={index}>
            {/* Icon to the left */}
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>

            {/* Text */}
            <ListItemText
              primary={friend.id}
              secondary={friend.verified ? 'Verified' : 'Pending'}
            />
            {/* Button to the right */}
            <ListItemSecondaryAction>
              {friend.verified ? <>{manageButton(friend)}</> : <>{declineButton(friend)} {acceptButton(friend)}</>}
            </ListItemSecondaryAction>
          </ListItem>
      );
    })
  };

  return (
    <>
    <Box className="devBox">
      <h3>{role === roles.poster ? 'Sending posts to:' : 'Getting updates from:'}</h3>
      <div>
        <List>
          {generateLinkedAccountsList(linkedAccounts)}
        </List>
      </div>
    </Box>
    <br/>

    <Box className="devBox">
      <h3>Pending invitations</h3>
      <div>
        <List>
          {generateLinkedAccountsList(pendingAccounts)}
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
      />
    }
    </>
  )
}

export default LinkedAccountManagement;