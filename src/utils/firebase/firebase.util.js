import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdsgrcwc2Coq-FoRTvnhZMoOpU4cARvF0",
  authDomain: "crwn-clothing-db-a50fa.firebaseapp.com",
  projectId: "crwn-clothing-db-a50fa",
  storageBucket: "crwn-clothing-db-a50fa.appspot.com",
  messagingSenderId: "225344646640",
  appId: "1:225344646640:web:33b527378c6518a0f88135",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error create the user", error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef;
};
