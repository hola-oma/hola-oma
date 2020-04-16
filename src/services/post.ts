//Resource: https://stackoverflow.com/questions/48036975/firestore-multiple-conditional-where-clauses

import * as firebase from "firebase/app";
import 'firebase/storage';
import { Post } from '../shared/models/post.model';
import { authenticateFromStore } from "./user";

export const getPosts = async (role: roles): Promise<Post[]> => {
  await authenticateFromStore();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const posts: Array<Post> = [];

  // Get user id
  let userId = user?.uid;
  console.log("user id: " + userId);

  // Set query options based on whether user is a poster or a receiver
  let queryOptions = [ ["receiverIDs", "array-contains"], ["users", "=="] ];
  let queryWhere = queryOptions[0];     // for receiver
  if (role === roles.poster) {          // else if poster
    queryWhere = queryOptions[1];
  }

  // Get posts
  await db.collection("posts")
    .where(queryWhere[0] as string,                   // FieldPath
      queryWhere[1] as "==" | "array-contains-any",   // opStr
      userId).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No posts found for: " + role + ", userID: " + userId);
        return;
      }
      snapshot.forEach(doc => {
      console.log(doc.id, '->', doc.data());
        let data = doc.data();
        posts.push({
          creatorID: data.creatorID,
          from: data.from,
          message: data.message,
          photoURL: data.photoURL,
          read: data.read,
          date: data.date,
          receiverIDs: data.receiverIDs
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  return posts;
}

export const createPost = async (post: Post) => {
  const db = firebase.firestore();

  try {
    await db.collection("posts").add({
      creatorID: post.creatorID,
      from: post.from,
      message: post.message,
      photoURL: post.photoURL,
      read: post.read,
      date: post.date,
      receiverIDs: post.receiverIDs
    });

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
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