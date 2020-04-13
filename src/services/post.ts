import * as firebase from "firebase/app";
import {Post} from '../shared/models/post.model';
import {authenticateFromStore} from "./user";
import {roles} from "../enums/enums";

export const getPosts = async (role: roles): Promise<Post[]> => {
  await authenticateFromStore();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const posts: Array<Post> = [];

  let userId = user?.uid;
  console.log("role passed in as parameter: " + role);
  console.log("user id: " + userId);

  // Get posts where grandparent is recipient
  if (role === roles.receiver) {
    console.log("showing receiver posts");
    await db.collection("posts")
      .where("receiverIDs", "array-contains", user?.uid).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No grandparent posts found");
          return;
        }

        snapshot.forEach(doc => {
          //console.log(doc.id, '->', doc.data());
          let data = doc.data();
          posts.push({
            id: data.id,
            creatorID: data.creatorID,
            from: data.from,
            message: data.message,
            photoURL: data.photoURL,
            read: data.read
          });
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  return posts;
}

/*
  // Get posts sent by family member
  await db.collection("posts")
    .where("users", "==", user?.uid).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No posts found");
        return;
      }

      snapshot.forEach(doc => {
        //console.log(doc.id, '->', doc.data());
        let data = doc.data();
        posts.push({
          id: data.id,
          creatorID: data.creatorID,
          from: data.from,
          message: data.message,
          photoURL: data.photoURL,
          read: data.read
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  
  return posts;
};
*/
// todo: createPost