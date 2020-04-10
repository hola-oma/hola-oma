import React, { useState } from 'react';
import { AccountLink } from 'shared/models/accountLink.model';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { roles } from 'enums/enums';

import PersonIcon from '@material-ui/icons/Person';
import ManageAccountLinkAlert from './ManageAccountLinkAlert';

interface ILinkedAccountManagement {
  role: string;
  linkedAccounts: AccountLink[];
  pendingAccounts: AccountLink[];
}

const LinkedAccountManagement: React.FC<ILinkedAccountManagement> = ({ role, linkedAccounts, pendingAccounts }) => { 

  const [selectedFriend, setSelectedFriend] = useState<AccountLink>();
  const [manageAccountLinkAlertOpen, setManageAccountLinkAlertOpen] = useState<boolean>(false);

  const muteFriend = (friend: AccountLink) => {
    console.log("Stub: Muting friend");
  }

  const unfriendFriend = (friend: AccountLink) => {
    console.log("Stub: Unfriending friend");
  }

  const handleManageAccountLinkAlertClose = () => {
    setManageAccountLinkAlertOpen(false);
  }

  const manageAccountLink = (friend: AccountLink) => {
    console.log("Opening alert to manage this friend: ", friend);
    setSelectedFriend(friend);
    setManageAccountLinkAlertOpen(true);
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
            <Button color="primary" onClick={() => manageAccountLink(friend)}>
              Manage
            </Button>
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
      <h3>Pending accounts</h3>
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
        muteFriend={() => muteFriend(selectedFriend)}
        unfriendFriend={() => unfriendFriend(selectedFriend)}
        onClose={handleManageAccountLinkAlertClose} 
      />
    }
    </>
  )
}

export default LinkedAccountManagement;