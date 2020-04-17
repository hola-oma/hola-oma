//Resource: https://stackoverflow.com/questions/48036975/firestore-multiple-conditional-where-clauses

import * as firebase from "firebase/app";
import 'firebase/storage';
import { Post } from '../shared/models/post.model';
import {authenticateFromStore, getUserDataByID, getUserRoleByID} from "./user";
import {roles} from "../enums/enums";
import {Simulate} from "react-dom/test-utils";

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

  // Get posts (rearranged try / catch block to ensure empty post array caught)
  try {
    await db.collection("posts")
      .where(fieldPath, opStr as "==" | "array-contains", userId).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No posts found for: " + userRole + ", userID: " + userId);
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
      })}
      catch(error) {
        console.error(error);
      }
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