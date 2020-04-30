import * as firebase from "firebase/app";
import 'firebase/storage';

import { Reply } from 'shared/models/reply.model';

export const createReply = async (reply: Reply) => {
  const db = firebase.firestore();
  let replyID = ""

  try {
    await db.collection("replies").add({
      date: reply.date,
      from: reply.from,
      read: reply.read,
      message: reply.message,
      responseTo: reply.responseTo,
      receiverID: reply.receiverID
    })
      .then(function(docRef) {
        console.log("New reply document written with ID: ", docRef.id);
        replyID = docRef.id;

      })
      .catch(function(error) {
        console.error("Error adding reply document: ", error);
      });
    return replyID;    // changed from bool

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const submitReply = async (e: any) => {
  e.preventDefault();

  let reply: Reply = {
    rid: "abc123",
    creatorID: "12345",
    date: new Date().getTime(),
    from: "Fakerly",
    read: false,
    message: ["not a real reply", "just testing"],
    responseTo: "put post id here",
    receiverID: "put the real one in later"
  };

  try {
    console.log("sending reply");
    const replySent = await createReply(reply);
    if (replySent) {
      console.log("success sending reply!");
      await updateReplyID(replySent);       // Add post id to new post document
    }
  } catch(e) {
    console.error(e.message);
  }
 };


export const updateReplyID = async (replyID: string) => {
  const db = firebase.firestore();
  await db.collection("posts").doc(replyID).update({
    "rid": replyID,
  })
    .then(function() {
      console.log("Reply successfully updated with reply ID");
    });
}

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
        from: user?.uid,
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