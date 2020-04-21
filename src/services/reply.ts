import * as firebase from "firebase/app";
import 'firebase/storage';

export const uploadPhoto = async (photoData: string) => {
  console.log(photoData);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  let replyID = "";

  // upload photo to firestore
  // get url from the upload
  // create a photo record in "photos" that contains the uploader's ID and the photo's URL 
 
  // Create a root reference
  let fileName = Date.now(); 
  var storageRef = firebase.storage().ref().child('/images/' + user?.uid + '/' + fileName);

  await storageRef.putString(photoData, 'data_url').then(async function(snapshot) {
    // this is the path to the file, save it in the "reply" record 
    console.log(snapshot.metadata.fullPath);

    // create a reply record 
    try {
      await db.collection("replies").add({
        creatorID: user?.uid,
        message: "",
        photoURL: snapshot.metadata.fullPath,
        date: Date.now(),
        })
        .then(function(docRef) {
          console.log("Reply document written with ID: ", docRef.id);
          replyID = docRef.id;
        })
        .catch(function(error) {
          console.error("Error adding reply: ", error);
        });

        // attach this reply ID to the post being replied to 
        return replyID;
    } catch(e) {
      console.log(e.message);
      throw Error(e.message);
    }
  });
}