import firebase from "firebase";

// NAMING CONVENTIONS - 
// ** PROFILE = "built-in" params for Firebase auth profiles (displayName, email, password)
// ** SETTINGS = our custom user-settings table (role)

export const getUserProfile = async () => {
  const user = firebase.auth().currentUser;
  return user;
}

export const updateUserProfile = async (displayName: string, email: string) => {
  // updateProfile and updateEmail are firebase methods
  // https://firebase.google.com/docs/auth/web/manage-users

  const user = firebase.auth().currentUser;
  try {
    if (user) {
      await user.updateProfile({
        displayName: displayName
      });

      console.log("updating email to: ", email);
      await user.updateEmail(email);
    }

    // todo: password update
    return true;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

// Retrieves user settings from our users db
export const getUserSettings = async () => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const userdoc = await db.collection("users").doc(user?.uid).get();
  return userdoc.data();
}

// Updates user settings for our db, can handle N key/value pairs 
export const updateUserSettings = async (settings: {[key: string]: any}) => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  db.collection("users").doc(user?.uid).set(settings);

  return true;
}

export const signUserInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    const signIn = await firebase
       .auth()
       .signInWithEmailAndPassword(email, password)

    return signIn;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const signUserInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    const signIn = await firebase
          .auth()
          .signInWithPopup(provider)

    return signIn;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const signUserOut = async () => {
  firebase.auth().signOut().then(function() {
    return true;
  });
}

export const createNewUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const createNewUserWithGoogleCredentials = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    await firebase
          .auth()
          .signInWithPopup(provider);

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

// The default auth object only has a limited set of parameters
// To store settings like "role", we must create a user entry in a separate "users" database.

// Note: displayName is stored on the userProfile, role is stored in our separate "users" db
export const createUserSettings = async (userID: string, role: string) => {
  const db = firebase.firestore();

  try {
    await db.collection("users").doc(userID).set({
      role: role
    });

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}