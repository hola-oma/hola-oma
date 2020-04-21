//Resource: https://stackoverflow.com/questions/48036975/firestore-multiple-conditional-where-clauses

import * as firebase from "firebase/app";
import 'firebase/storage';
import { Post } from '../shared/models/post.model';
import {authenticateFromStore, getUserRoleByID} from "./user";
import {roles} from "../enums/enums";

export const getPosts = async (): Promise<Post[]> => {
  await authenticateFromStore();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const posts: Array<Post> = [];

  // Get user id and set query options
  let userId = user?.uid;
  let userRole: string = await getUserRoleByID(user?.uid as string);
  let fieldPath = (userRole === roles.receiver) ? "receiverIDs" : "creatorID";
  let opStr = (userRole === roles.receiver) ? "array-contains" : "==";

  try {
    const postRef = db.collection('posts')
      .where(fieldPath, opStr as "==" | "array-contains", userId)
      .orderBy("date", "desc")
    postRef.onSnapshot(snapshot => {          // listen for state change
      const currentPosts: Post[] = [];
      snapshot.forEach(doc => {
        // console.log(doc.id, '->', doc.data());
        const data = doc.data();
        currentPosts.push({
          pid: data.pid,
          creatorID: data.creatorID,
          from: data.from,
          message: data.message,
          photoURL: data.photoURL,
          read: data.read,
          date: data.date,
          receiverIDs: data.receiverIDs
        })
      })
      posts.length = 0;      // Clear array so posts not appended on state change
      posts.push(...currentPosts);
    })
  } catch (error) {
    console.error(error);
  }
  return posts;
}

export const createPost = async (post: Post) => {
  const db = firebase.firestore();
  let postID = ""

  try {
    await db.collection("posts").add({
      creatorID: post.creatorID,
      from: post.from,
      message: post.message,
      photoURL: post.photoURL,
      read: post.read,
      date: post.date,
      receiverIDs: post.receiverIDs
      })
      .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      postID = docRef.id;

      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    return postID;    // changed from bool

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const updatePostID = async (postID: string) => {
  const db = firebase.firestore();
  await db.collection("posts").doc(postID).update({
    "pid": postID,
  })
    .then(function() {
      console.log("Document successfully updated with post ID!");
    });
}

export const uploadFile = async(selectedFile: File) => {
  // Get a unique name to store the file under
  let fileName = Date.now(); 
  let storageRef = firebase.storage().ref().child('/images/'+ fileName); 
  let downloadURL = "";

  let uploadTask = await storageRef.put(selectedFile);
  downloadURL = await uploadTask.ref.getDownloadURL();
  return downloadURL;
}

export const markPostRead = async (postID: string) => {
  const db = firebase.firestore();
  let postRef: firebase.firestore.DocumentReference;

  try {
    db.collection("posts").doc(postID);   // Catch error for posts that have no pid
    
    postRef = db.collection("posts").doc(postID);
    postRef.get().then(function(doc) {
      if (doc.exists) {
        postRef.update({"read": true})
      } else {
        console.log("Error updating post: " + postID +
          "(probably an older post not created with pid)");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }
  catch (error) {
    console.log("Invalid format: no post id");
  }
}


export const uploadPhoto = async (photoData: string) => {
  console.log(photoData);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  // upload photo to firestore
  // get url from the upload
  // create a photo record in "photos" that contains the uploader's ID and the photo's URL 
 
  // Create a root reference
  let fileName = Date.now(); 
  var storageRef = firebase.storage().ref().child('/images/' + user?.uid + '/' + fileName);

  await storageRef.putString(photoData, 'data_url').then(function(snapshot) {
    console.log(snapshot);
    console.log("attach this url to the 'reply' data:");
    console.log(snapshot.metadata.fullPath);
  });

}