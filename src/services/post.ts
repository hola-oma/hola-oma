import * as firebase from "firebase/app";
import { Post } from '../shared/models/post.model';
import { authenticateFromStore } from "./user";

export const getPosts = async (): Promise<Post[]> => {
  await authenticateFromStore();
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const posts: Array<Post> = [];

  await db.collection("posts")
                        .where("creatorID", "==", user?.uid).get()
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
}

// todo: createPost