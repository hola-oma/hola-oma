import firebase from "firebase";
import { AccountLink } from "shared/models/accountLink.model";


export const getLinkedAccounts = async (): Promise<AccountLink[]> => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const links = await db.collection("accountLinks").doc(user?.uid).get();
  const linkData = links.data() as Object;
  console.log(linkData);

  //return Object?.entries(linkData) ?? AccountLink[];
  let accountLinks: AccountLink[] = [];

  if (linkData) {
    Object.keys(linkData).forEach((key, value) => {
      accountLinks.push({id: key, verified: !!value});
    })
  } else {
    accountLinks = [];
  }

  return accountLinks;
}


// obviously we won't ask users to input the actual ID of the user they want to link with
// this is just for the first-pass implementation 
// later, we'll give the user a simple "pass phrase" to share or allow them to link up by entering the other user's email address
export const createLinkByID = async(id: string) => {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  try {
    // create a document with the signed in user's ID
    // add the desired account ID as an "accountLink"
    // set it to FALSE because it is PENDING at this point
    await db.collection("accountLinks").doc(user?.uid).set({
      [id]: false,
    });

    // create another document, this one with the pending user's ID 
    // add the desired account ID as an "accountLink"
    // set it to FALSE because it is PENDING at this point
    let userID = user?.uid.toString();
    if (userID) {
      await db.collection("accountLinks").doc(id).set({
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