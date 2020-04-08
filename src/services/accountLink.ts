import firebase from "firebase";

export const getLinkedAccounts = async (): Promise<string[]> => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const links = await db.collection("accountLinks").doc(user?.uid).get();
  const linkData = links.data() as Object;

  return Object.keys(linkData) ?? [];
}


// obviously we won't ask users to input the actual ID of the user they want to link with
// this is just for the first-pass implementation 
// later, we'll give the user a simple "pass phrase" to share or allow them to link up by entering the other user's email address
export const createLinkByID = async(id: string) => {
  console.log("Got this id: " + id);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  try {
    await db.collection("accountLinks").doc(user?.uid).set({
      [id]: true,
    });

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}