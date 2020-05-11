import * as firebase from "firebase/app";
import 'firebase/storage';

import { Reply } from 'shared/models/reply.model';

export const setReplyContent = (userID: string, displayName: string, replyType: string,
                                message: Array<number> | string, responseTo: string, receiverID: string) => {
  let replyContent: Reply = {
    rid: "",
    creatorID: userID,
    from: displayName,
    date: new Date().getTime(),
    read: false,
    replyType: replyType,
    message: message,
    responseTo: responseTo,
    receiverID: receiverID
  }
  return replyContent;
}

export const submitReply = async (e: any, currentReply: Reply) => {
  e.preventDefault();

  try {
    const replySent = await createReplyDocument(currentReply);
    if (replySent) {
      await updateReplyID(replySent);       // Add post id to new post document
    }
  } catch(e) {
    console.error(e.message);
  }
 };

export const createReplyDocument = async (reply: Reply) => {
  const db = firebase.firestore();
  let replyID = ""

  try {
    await db.collection("replies").add({
      date: reply.date,
      creatorID: reply.creatorID,
      from: reply.from,
      read: reply.read,
      replyType: reply.replyType,
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

export const updateReplyID = async (replyID: string) => {
  const db = firebase.firestore();
  await db.collection("replies").doc(replyID).update({
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

export const getRepliesToPost = async (postId: string) => {
  const db = firebase.firestore();
  const currentReplies: Reply[] = [];

  try {
    await db.collection('replies')
      .where("responseTo", "==", postId)
      .orderBy("date", "desc")
    .get().then((snapshot) => {
      snapshot.forEach(doc => {
        // console.log(doc.id, '->', doc.data());
        const reply = doc.data();
        currentReplies.push({
          date: reply.date,
          creatorID: reply.creatorID,
          from: reply.from,
          read: reply.read,
          replyType: reply.replyType,
          message: reply.message,
          responseTo: reply.responseTo,
          receiverID: reply.receiverID,
          rid: reply.rid
        })
      })
    })
  } catch (error) {
    console.error(error);
  }
  return currentReplies;
}

export const markReplyRead = (rid: string) => {
  const db = firebase.firestore();
  let replyRef: firebase.firestore.DocumentReference;

  try {
    db.collection("replies").doc(rid);   // Catch error for items that have no pid
    
    replyRef = db.collection("replies").doc(rid);
    replyRef.get().then(function(doc) {
      if (doc.exists) {
        replyRef.update({"read": true})
      } else {
        console.log("Error updating post: " + rid);
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
  catch (error) {
    console.log("Invalid format: no reply id");
  }
}