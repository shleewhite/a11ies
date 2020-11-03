import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
else firebase.app();

export const uiConfig = {
  signInFlow: "redirect",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/",
};

export const auth = firebase.auth();

export const getAccessLevel = async () => {
  if (auth.currentUser !== null) {
    const token = await auth.currentUser.getIdTokenResult(true);
    console.log("hii", token.claims);
    return !!token.claims.admin;
  }
  return null;
};
