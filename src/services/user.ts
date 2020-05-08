import * as firebase from "firebase/app";

// NAMING CONVENTIONS - 
// ** PROFILE = "built-in" params for Firebase auth profiles (displayName, email, password)
// ** SETTINGS = our custom user-settings table (role)

export const getUserProfile = async () => {
  await authenticateFromStore();
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

      await user.updateEmail(email);
    }
    // todo: password update
    return true;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const sendPasswordResetEmail = async (emailAddress: string) => {
  const auth = firebase.auth();

  try {
    await auth.sendPasswordResetEmail(emailAddress);
    return true;
  } catch(e) {
    // no user exists with this email 
    throw Error(e.message);
  }
}

// Retrieves user settings from our users db
export const getUserSettings = async () => {
  await authenticateFromStore();
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const userdoc = await db.collection("users").doc(user?.uid).get();
  return userdoc.data();
}

// get just the display name for the user with the given ID 
export const getDisplayNameByID = async (id: string) => {
  const db = firebase.firestore();
  const userdoc = await db.collection("users").doc(id).get();
  return userdoc?.data()?.displayName;
}

export const getUserRoleByID = async (id: string): Promise<string> => {
  const db = firebase.firestore();
  const userdoc = await db.collection("users").doc(id).get();
  return userdoc?.data()?.role;
}

export const getUserDataByID = async (id: string) => {
  const db = firebase.firestore();
  const userdoc = await db.collection("users").doc(id).get();
  return userdoc?.data();
}

// Updates user settings for our db, can handle N key/value pairs 
export const updateUserSettings = async (settings: {[key: string]: any}) => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  db.collection("users").doc(user?.uid).update(settings);

  // we can remove this later in development (after week 5+)
  // it's just here so existing accounts get an id applied to their users record when settings are updated
  // normally the id field is written when the account is created and never again
  db.collection("users").doc(user?.uid).update({
    uid: user?.uid
  })

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
    let errorCode = e.code;
    if (errorCode === 'auth/user-not-found') {
      throw Error("There is no user with the provided e-mail address!")
    } else if (errorCode === 'auth/wrong-password') {
      throw Error("Incorrect password. Please try again or reset your password.")
    } else {
      throw Error(e.message);
    }
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
export const createUserSettings = async (userID: string, role: string, displayName: string, email: string) => {
  const db = firebase.firestore();

  try {
    await db.collection("users").doc(userID).set({
      role: role,
      displayName: displayName,
      email: email,
      uid: userID
    });

    return true;

  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const authenticateFromStore = async () => {
  const user = firebase.auth().currentUser;
  let resolveAuthPromise = () => {};

  const isAuthenticated = new Promise((resolve)=> {
    resolveAuthPromise = resolve;
  });

  if (user) {
    resolveAuthPromise();
  } 
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      resolveAuthPromise();
    }

  });

  return isAuthenticated;
}

export const verifyActionCode = async (actionCode: string) => {
  const auth = firebase.auth();
  try {
    let email = await auth.verifyPasswordResetCode(actionCode);
    return email;
  } catch(e) {
    // invalid or expired action code, ask the user to try to reset the password again 
    throw Error(e.message);
  }
}

export const resetPassword = async (actionCode: string, newPassword: string) => {
  const auth = firebase.auth();
  try {
    await auth.confirmPasswordReset(actionCode, newPassword)
    // password has been confirmed and the new password updated
    return true;
  } catch(e) {
    // code expired or password too weak 
    throw Error(e.message);
  }
}