import * as firebase from "firebase/app";

import { AccountLink } from "shared/models/accountLink.model";
import { authenticateFromStore } from "./user";

export const getLinkedAccounts = async (): Promise<AccountLink[]> => {
  await authenticateFromStore();
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const links = await db.collection("accountLinks").doc(user?.uid).get();
  const linkData = links.data() as Object;

  //return Object?.entries(linkData) ?? AccountLink[];
  let accountLinks: AccountLink[] = [];

  if (linkData) {
    console.log(linkData); // object with key value pairs as fields 
    const linkDataEntries = Object.entries(linkData); // turns it into an array of arrays
    accountLinks = linkDataEntries.reduce((accum: any, current) => { //accum is the array it built so far (on each iteration)
      const obj = {
        id: current[0],
        verified: current[1]
      }
      return accum.concat(obj)
    }, []); // start with empty array 

  } else {
    accountLinks = [];
  }

  return accountLinks;
}

// obviously we won't ask users to input the actual ID of the user they want to link with
// this is just for the first-pass implementation 
// later, we'll give the user a simple "pass phrase" to share or allow them to link up by entering the other user's email address
export const createLinkByID = async(otherUserID: string) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  try {
    // create a document with the signed in user's ID
    // add the desired account ID as an "accountLink"
    // set it to FALSE because the other user has not accepted the link
    await db.collection("accountLinks").doc(user?.uid).set({
      [otherUserID]: false,
    });

    // create another document, this one with the pending user's ID 
    // add the desired account ID as an "accountLink"
    // set it to FALSE because it is PENDING at this point
    // we don't know yet if this user approves of the link 
    let userID = user?.uid.toString();
    if (userID) {
      await db.collection("accountLinks").doc(otherUserID).set({
        [userID]: false,
      });
    } else {
      console.log("error creating linked account entry");
      return false;
    }

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

// Retrieves user settings from our users db
export const getUserSettings = async () => {
  await authenticateFromStore();
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const userdoc = await db.collection("users").doc(user?.uid).get();
  return userdoc.data();
}

export const createLinkByEmail = async (otherUserEmail: string) => {
  await authenticateFromStore();
  const db = firebase.firestore();

  // get userdoc that has an email matching the "otherUserEmail" var passed in
  await db.collection("users")
    .where("email", "==", otherUserEmail).get()
      .then( async (snapshot) => {
        if (snapshot.empty) {
          console.log("No users with this email address were found");
          return;
        }

        const matchingRecord = snapshot.docs[0].data();
        console.log(matchingRecord);
        if (!matchingRecord.uid) {
          throw Error("Invited user does not have an ID in their users record");
        } else {
          try {
            createLinkByID(matchingRecord.uid);
          } catch(e) {
            console.log("Something went wrong trying to create a link with this user");
          }
        }
    })
    .catch(err => {
      console.log('Error finding a user that matches the email address you provided', err);
    });

    return true;
}

export const acceptLink = async(acceptThisUserLinkID: string) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  // Get the document by current user's ID
  // The pending link is the other user's ID within that doc 
  try {
    let userID = user?.uid.toString();
    if (userID) {
      await db.collection("accountLinks").doc(user?.uid).update({
        [acceptThisUserLinkID]: true,
      });

      // tell the "inviter" that their invitation was accepted from this specific user 
      await db.collection("accountLinks").doc(acceptThisUserLinkID).update({
        [userID]: true,
      })
    }

    return true;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

/* Removes a link, regardless of whether it was pending or verified */
/* Currently, there is no way to remove a link but return it to 'pending' or 'soft delete' it */
export const removeLink = async(removeThisUserLinkID: string) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  let userID = user?.uid.toString();

  // Get the document by current user's ID
  // The pending link is the other user's ID within that doc 
  if (userID) {
    try {
      await db.collection("accountLinks").doc(user?.uid).update({
        [removeThisUserLinkID]: firebase.firestore.FieldValue.delete(),
      });
  
      await db.collection("accountLinks").doc(removeThisUserLinkID).update({
          [userID]: firebase.firestore.FieldValue.delete(),
      });
      return true;
    } catch(e) {
      console.log(e.message);
      throw Error(e.message);
    }
  } else {
    console.log("Problem with user ID");
  }
}